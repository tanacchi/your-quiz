import fs from "node:fs";
import path from "node:path";
import { createTwoFilesPatch } from "diff";

export type Pos = { line: number; column: number };
export type Location = { start: Pos; end: Pos };
export type Mutant = {
  id: string;
  mutatorName: string;
  status: string;
  location: Location;
  replacement?: string;
  description?: string;
};
export type FileEntry = {
  language?: string;
  source?: string;
  mutants: Mutant[];
};
export type Report = {
  files: Record<string, FileEntry>;
};

export type ExcludedMutant = {
  id: string;
  file: string;
  mutatorName: string;
  original_slice: string;
  replacement: string;
  location: Location;
  reason: string;
  category: string;
  added_by: string;
  added_at: string;
};

export type ExcludedMutantsConfig = {
  version: string;
  description: string;
  excluded_mutants: ExcludedMutant[];
  categories: Record<string, string>;
};

const toIndex = (src: string, pos: Pos) => {
  const lines = src.split(/\r?\n/);
  let idx = 0;
  for (let i = 0; i < pos.line - 1; i++) idx += (lines[i]?.length ?? 0) + 1;
  return idx + (pos.column - 1);
};

const applyReplacement = (src: string, loc: Location, replacement: string) => {
  const start = toIndex(src, loc.start);
  const end = toIndex(src, loc.end);
  const originalSlice = src.slice(start, end);
  const mutated = src.slice(0, start) + replacement + src.slice(end);
  return { mutated, originalSlice };
};

const sanitizeFilename = (filePath: string): string => {
  return filePath
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const loadExcludedMutants = (configPath?: string): ExcludedMutant[] => {
  const defaultPath = path.join(__dirname, "equivalent-mutants.json");
  const targetPath = configPath ?? defaultPath;

  try {
    if (!fs.existsSync(targetPath)) {
      return [];
    }
    const config: ExcludedMutantsConfig = JSON.parse(
      fs.readFileSync(targetPath, "utf-8"),
    );
    return config.excluded_mutants || [];
  } catch (error) {
    console.warn(
      `Warning: Failed to load excluded mutants from ${targetPath}:`,
      error,
    );
    return [];
  }
};

const isExcludedMutant = (
  mutant: Mutant,
  filePath: string,
  excludedMutants: ExcludedMutant[],
): boolean => {
  return excludedMutants.some(
    (excluded) =>
      excluded.id === mutant.id &&
      excluded.file === filePath &&
      excluded.mutatorName === mutant.mutatorName,
  );
};

const explain = (
  mutatorName: string,
  original?: string,
  replacement?: string,
) => {
  const base = mutatorName.toLowerCase();
  if (base.includes("arithmetic"))
    return `算術演算子が置換されています（例: ${original ?? ""} → ${replacement ?? ""}）。`;
  if (base.includes("equality"))
    return `等価演算子が置換されています（==/=== ⇄ !=/!==）。`;
  if (base.includes("boolean"))
    return `ブーリアンが反転しています（true/false）。`;
  if (base.includes("logical"))
    return `論理演算子が置換されています（&&/|| ⇄ ||/&&）。`;
  if (base.includes("conditional")) return `条件式が変更されています。`;
  if (base.includes("unary"))
    return `単項演算子が変更されています（例: !condition → condition）。`;
  return `ミューテータ \"${mutatorName}\" による置換。`;
};

export function generateSurvivorReports(
  report: Report,
  options?: {
    projectRoot?: string;
    outDir?: string;
    excludedMutantsPath?: string;
  },
) {
  const outDir = options?.outDir ?? "reports/custom";
  fs.mkdirSync(outDir, { recursive: true });

  // Load excluded mutants configuration
  const excludedMutants = loadExcludedMutants(options?.excludedMutantsPath);

  const jsonl: string[] = [];
  const excludedJsonl: string[] = [];
  const mdPaths: string[] = [];
  const fileMarkdowns: Record<string, string[]> = {};
  const excludedMarkdown: string[] = [
    "# Excluded Equivalent Mutants Report",
    "",
  ];

  for (const [filePath, f] of Object.entries(report.files ?? {})) {
    const survivors = (f.mutants ?? []).filter((m) => m.status === "Survived");
    if (!survivors.length) continue;

    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(options?.projectRoot ?? process.cwd(), filePath);

    const src =
      f.source ??
      (fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf-8") : "");
    if (!src) continue;

    // Separate excluded and included survivors
    const includedSurvivors = survivors.filter(
      (m) => !isExcludedMutant(m, filePath, excludedMutants),
    );
    const excludedSurvivors = survivors.filter((m) =>
      isExcludedMutant(m, filePath, excludedMutants),
    );

    // Initialize markdown for this file only if there are included survivors
    if (includedSurvivors.length > 0) {
      fileMarkdowns[filePath] = [`# Survived mutants report: ${filePath}`, ""];
    }

    // Process included survivors
    for (const m of includedSurvivors) {
      const startIdx = toIndex(src, m.location.start);
      const endIdx = toIndex(src, m.location.end);
      const originalSlice = src.slice(startIdx, endIdx);
      const replacement =
        m.replacement ?? (originalSlice ? "/* mutated */" : "");

      const { mutated } = applyReplacement(src, m.location, replacement);
      const patch = createTwoFilesPatch(
        filePath,
        filePath,
        src,
        mutated,
        "original",
        `mutated #${m.id}`,
      );

      jsonl.push(
        JSON.stringify({
          file: filePath,
          mutator: m.mutatorName,
          mutant_id: m.id,
          range: m.location,
          original_slice: originalSlice,
          replacement,
          unified_diff: patch,
          instruction:
            "このサバイブ・ミューテーションを失敗させる最小テストを設計してください。",
          hint: explain(m.mutatorName, originalSlice, replacement),
        }),
      );

      fileMarkdowns[filePath].push(
        `## mutant #${m.id} (${m.mutatorName})`,
        "", // 空白行を追加
        `Location: L${m.location.start.line}:${m.location.start.column}–L${m.location.end.line}:${m.location.end.column}`,
        "",
        "```diff",
        patch.trim(),
        "```",
        "",
        `**Hint**: ${explain(m.mutatorName, originalSlice, replacement)}`,
        "",
      );
    }

    // Process excluded survivors
    for (const m of excludedSurvivors) {
      const startIdx = toIndex(src, m.location.start);
      const endIdx = toIndex(src, m.location.end);
      const originalSlice = src.slice(startIdx, endIdx);
      const replacement =
        m.replacement ?? (originalSlice ? "/* mutated */" : "");

      const { mutated } = applyReplacement(src, m.location, replacement);
      const patch = createTwoFilesPatch(
        filePath,
        filePath,
        src,
        mutated,
        "original",
        `mutated #${m.id}`,
      );

      const excludedEntry = excludedMutants.find(
        (ex) =>
          ex.id === m.id &&
          ex.file === filePath &&
          ex.mutatorName === m.mutatorName,
      );

      excludedJsonl.push(
        JSON.stringify({
          file: filePath,
          mutator: m.mutatorName,
          mutant_id: m.id,
          range: m.location,
          original_slice: originalSlice,
          replacement,
          unified_diff: patch,
          excluded_reason: excludedEntry?.reason ?? "Unknown",
          excluded_category: excludedEntry?.category ?? "unknown",
          excluded_by: excludedEntry?.added_by ?? "unknown",
          excluded_at: excludedEntry?.added_at ?? "unknown",
        }),
      );

      excludedMarkdown.push(
        `## ${filePath} — mutant #${m.id} (${m.mutatorName}) [EXCLUDED]`,
        "",
        `**Reason**: ${excludedEntry?.reason ?? "Unknown"}`,
        `**Category**: ${excludedEntry?.category ?? "unknown"}`,
        `**Location**: L${m.location.start.line}:${m.location.start.column}–L${m.location.end.line}:${m.location.end.column}`,
        "",
        "```diff",
        patch.trim(),
        "```",
        "",
      );
    }
  }

  // Write JSONL file
  const jsonlPath = path.join(outDir, "survived.jsonl");
  fs.writeFileSync(jsonlPath, jsonl.join("\n") + (jsonl.length ? "\n" : ""));

  // Write excluded mutants files
  const excludedJsonlPath = path.join(outDir, "excluded-mutants.jsonl");
  const excludedMdPath = path.join(outDir, "excluded-mutants.md");
  fs.writeFileSync(
    excludedJsonlPath,
    excludedJsonl.join("\n") + (excludedJsonl.length ? "\n" : ""),
  );
  fs.writeFileSync(excludedMdPath, excludedMarkdown.join("\n"));

  // Write individual markdown files for each source file
  for (const [filePath, mdContent] of Object.entries(fileMarkdowns)) {
    const sanitizedFilename = sanitizeFilename(filePath);
    const mdPath = path.join(outDir, `survived-${sanitizedFilename}.md`);
    fs.writeFileSync(mdPath, mdContent.join("\n"));
    mdPaths.push(mdPath);
  }

  return {
    jsonlPath,
    mdPaths,
    jsonl,
    excludedJsonlPath,
    excludedMdPath,
    excludedJsonl,
    totalMutants: jsonl.length,
    excludedMutants: excludedJsonl.length,
    fileCount: Object.keys(fileMarkdowns).length,
  };
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const reportPath =
    process.argv[2] ?? "api/reports/mutation/mutation-report.json";
  const outDir = process.argv[3] ?? "reports/mutation-analysis";

  try {
    const reportData = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
    const excludedMutantsPath = path.join(__dirname, "equivalent-mutants.json");
    const result = generateSurvivorReports(reportData, {
      outDir,
      excludedMutantsPath,
    });

    console.log(`Generated survivor reports:`);
    console.log(`  Active Survivors JSONL: ${result.jsonlPath}`);
    console.log(`  Active Survivors Markdown: ${result.mdPaths.join(", ")}`);
    console.log(`  Excluded Mutants JSONL: ${result.excludedJsonlPath}`);
    console.log(`  Excluded Mutants Markdown: ${result.excludedMdPath}`);
    console.log(`Results:`);
    console.log(`  Active survivors (要対応): ${result.totalMutants}`);
    console.log(`  Excluded equivalent mutants: ${result.excludedMutants}`);
    console.log(`  Files analyzed: ${result.fileCount}`);
  } catch (error) {
    console.error("Error generating survivor reports:", error);
    process.exit(1);
  }
}
