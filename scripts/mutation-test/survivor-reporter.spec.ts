import fs from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateSurvivorReports, type Report } from "./survivor-reporter";

const normalize = (s: string) =>
  s.replaceAll(process.cwd(), "<REPO>").replaceAll(/\r\n/g, "\n");

describe("generateSurvivorReports", () => {
  it("should generate JSONL and Markdown reports for survived mutations", () => {
    const report: Report = {
      files: {
        "src/math/add.ts": {
          source: `export function add(a: number, b: number) {
  return a + b;
}`,
          mutants: [
            {
              id: "1",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 2, column: 12 },
                end: { line: 2, column: 13 },
              },
              replacement: "-",
            },
            {
              id: "2",
              mutatorName: "EqualityOperator",
              status: "Killed",
              location: {
                start: { line: 2, column: 8 },
                end: { line: 2, column: 9 },
              },
              replacement: "!==",
            },
          ],
        },
      },
    };

    const { jsonl, mdPaths, totalMutants, fileCount, fileDirectories } =
      generateSurvivorReports(report, {
        outDir: path.join(tmpdir(), "mutation-reports-1"),
      });

    // Only survived mutations should be included
    expect(jsonl).toHaveLength(1);

    // JSONL should contain correct structure
    const firstJsonl = jsonl[0];
    if (!firstJsonl) throw new Error("No JSONL data found");
    const jsonlData = JSON.parse(firstJsonl);
    expect(jsonlData).toMatchObject({
      file: "src/math/add.ts",
      mutator: "ArithmeticOperator",
      mutant_id: "1",
      range: { start: { line: 2, column: 12 }, end: { line: 2, column: 13 } },
      original_slice: "+",
      replacement: "-",
      instruction:
        "このサバイブ・ミューテーションを失敗させる最小テストを設計してください。",
      hint: "算術演算子が置換されています（例: + → -）。",
    });
    expect(jsonlData.stable_id).toBeDefined();
    expect(typeof jsonlData.stable_id).toBe("string");
    expect(jsonlData.stable_id).toHaveLength(8);
    expect(jsonlData.unified_diff).toContain("-  return a + b;");
    expect(jsonlData.unified_diff).toContain("+  return a - b;");

    // Should generate one directory and one markdown file per mutant
    expect(fileDirectories).toHaveLength(1);
    expect(mdPaths).toHaveLength(1);
    expect(totalMutants).toBe(1);
    expect(fileCount).toBe(1);

    // Check the generated directory structure
    const fileDir = fileDirectories[0];
    if (!fileDir) throw new Error("fileDir is undefined");
    expect(fs.existsSync(fileDir)).toBe(true);
    expect(path.basename(fileDir)).toBe("src-math-add-ts");

    // Check the generated markdown file
    expect(mdPaths[0]).toBeDefined();
    const mdPath = mdPaths[0];
    if (!mdPath) throw new Error("mdPath is undefined");
    const mdContent = fs.readFileSync(mdPath, "utf-8");
    expect(normalize(mdContent)).toContain(
      `# Mutant ${jsonlData.stable_id} Report`,
    );
    expect(normalize(mdContent)).toContain("**File**: src/math/add.ts");
    expect(normalize(mdContent)).toContain("**Mutator**: ArithmeticOperator");
    expect(normalize(mdContent)).toContain("**Original ID**: 1");
    expect(normalize(mdContent)).toContain("**Location**: L2:12–L2:13");
    expect(normalize(mdContent)).toContain("```diff");
    expect(normalize(mdContent)).toContain(
      "算術演算子が置換されています（例: + → -）。",
    );
    expect(path.dirname(mdPath)).toBe(fileDir);
    expect(path.basename(mdPath)).toBe(`mutant-${jsonlData.stable_id}.md`);
  });

  it("should handle files with no survived mutations", () => {
    const report: Report = {
      files: {
        "src/math/add.ts": {
          source: `export function add(a: number, b: number) {
  return a + b;
}`,
          mutants: [
            {
              id: "1",
              mutatorName: "ArithmeticOperator",
              status: "Killed",
              location: {
                start: { line: 2, column: 12 },
                end: { line: 2, column: 13 },
              },
              replacement: "-",
            },
          ],
        },
      },
    };

    const { jsonl, mdPaths, totalMutants, fileCount, fileDirectories } =
      generateSurvivorReports(report, {
        outDir: path.join(tmpdir(), "mutation-reports-2"),
      });

    expect(jsonl).toHaveLength(0);
    expect(mdPaths).toHaveLength(0);
    expect(totalMutants).toBe(0);
    expect(fileCount).toBe(0);
    expect(fileDirectories).toHaveLength(0);
  });

  it("should generate proper hints for different mutator types", () => {
    const report: Report = {
      files: {
        "src/test.ts": {
          source: `const test = true && false === true;`,
          mutants: [
            {
              id: "1",
              mutatorName: "BooleanLiteral",
              status: "Survived",
              location: {
                start: { line: 1, column: 13 },
                end: { line: 1, column: 17 },
              },
              replacement: "false",
            },
            {
              id: "2",
              mutatorName: "LogicalOperator",
              status: "Survived",
              location: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 20 },
              },
              replacement: "||",
            },
            {
              id: "3",
              mutatorName: "EqualityOperator",
              status: "Survived",
              location: {
                start: { line: 1, column: 28 },
                end: { line: 1, column: 31 },
              },
              replacement: "!==",
            },
          ],
        },
      },
    };

    const { jsonl, mdPaths, fileDirectories } = generateSurvivorReports(
      report,
      {
        outDir: path.join(tmpdir(), "mutation-reports-3"),
      },
    );

    expect(jsonl).toHaveLength(3);
    expect(mdPaths).toHaveLength(3);
    expect(fileDirectories).toHaveLength(1);

    const hints = jsonl.map((line) => JSON.parse(line).hint);
    expect(hints[0]).toContain("ブーリアンが反転しています");
    expect(hints[1]).toContain("論理演算子が置換されています");
    expect(hints[2]).toContain("等価演算子が置換されています");
  });

  it("should handle files that do not exist on disk", () => {
    const report: Report = {
      files: {
        "src/nonexistent.ts": {
          // No source provided and file doesn't exist
          mutants: [
            {
              id: "1",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 1, column: 1 },
                end: { line: 1, column: 2 },
              },
              replacement: "-",
            },
          ],
        },
      },
    };

    const { jsonl, mdPaths, totalMutants, fileCount, fileDirectories } =
      generateSurvivorReports(report, {
        outDir: path.join(tmpdir(), "mutation-reports-4"),
      });

    // Should skip files without source
    expect(jsonl).toHaveLength(0);
    expect(mdPaths).toHaveLength(0);
    expect(totalMutants).toBe(0);
    expect(fileCount).toBe(0);
    expect(fileDirectories).toHaveLength(0);
  });

  it("should write files to the specified output directory", () => {
    const report: Report = {
      files: {
        "src/test.ts": {
          source: `const test = 1 + 2;`,
          mutants: [
            {
              id: "1",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 1, column: 15 },
                end: { line: 1, column: 16 },
              },
              replacement: "-",
            },
          ],
        },
      },
    };

    const outDir = path.join(tmpdir(), "test-output");
    const { jsonlPath, mdPaths, fileDirectories } = generateSurvivorReports(
      report,
      { outDir },
    );

    expect(fs.existsSync(jsonlPath)).toBe(true);
    expect(mdPaths).toHaveLength(1);
    expect(fileDirectories).toHaveLength(1);
    expect(mdPaths[0]).toBeDefined();
    const mdPath = mdPaths[0];
    const fileDir = fileDirectories[0];
    if (!mdPath) throw new Error("mdPath is undefined");
    if (!fileDir) throw new Error("fileDir is undefined");
    expect(fs.existsSync(mdPath)).toBe(true);
    expect(fs.existsSync(fileDir)).toBe(true);
    expect(jsonlPath).toBe(path.join(outDir, "survived.jsonl"));
    expect(path.dirname(mdPath)).toBe(fileDir);
    expect(fileDir).toBe(path.join(outDir, "src-test-ts"));

    // Clean up
    fs.rmSync(outDir, { recursive: true, force: true });
  });

  it("should generate stable IDs consistently", () => {
    const report: Report = {
      files: {
        "src/math/calc.ts": {
          source: `function calculate(x: number) {
  return x * 2;
}`,
          mutants: [
            {
              id: "42",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 2, column: 11 },
                end: { line: 2, column: 12 },
              },
              replacement: "/",
            },
          ],
        },
      },
    };

    const outDir1 = path.join(tmpdir(), "stable-id-test-1");
    const outDir2 = path.join(tmpdir(), "stable-id-test-2");

    const result1 = generateSurvivorReports(report, { outDir: outDir1 });
    const result2 = generateSurvivorReports(report, { outDir: outDir2 });

    const data1 = JSON.parse(result1.jsonl[0] as string);
    const data2 = JSON.parse(result2.jsonl[0] as string);

    expect(data1.stable_id).toBe(data2.stable_id);
    expect(data1.stable_id).toHaveLength(8);

    // Clean up
    fs.rmSync(outDir1, { recursive: true, force: true });
    fs.rmSync(outDir2, { recursive: true, force: true });
  });

  it("should create separate files for multiple mutants in same file", () => {
    const report: Report = {
      files: {
        "src/utils.ts": {
          source: `export function add(a: number, b: number) {
  return a + b;
}
export function sub(a: number, b: number) {
  return a - b;
}`,
          mutants: [
            {
              id: "1",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 2, column: 12 },
                end: { line: 2, column: 13 },
              },
              replacement: "-",
            },
            {
              id: "2",
              mutatorName: "ArithmeticOperator",
              status: "Survived",
              location: {
                start: { line: 5, column: 12 },
                end: { line: 5, column: 13 },
              },
              replacement: "+",
            },
          ],
        },
      },
    };

    const outDir = path.join(tmpdir(), "multiple-mutants-test");
    const { mdPaths, fileDirectories, totalMutants } = generateSurvivorReports(
      report,
      { outDir },
    );

    expect(fileDirectories).toHaveLength(1);
    expect(mdPaths).toHaveLength(2);
    expect(totalMutants).toBe(2);

    const fileDir = fileDirectories[0] as string;
    expect(fs.existsSync(fileDir)).toBe(true);
    expect(path.basename(fileDir)).toBe("src-utils-ts");

    // Both markdown files should exist in the same directory
    for (const mdPath of mdPaths) {
      expect(fs.existsSync(mdPath)).toBe(true);
      expect(path.dirname(mdPath)).toBe(fileDir);
      expect(path.basename(mdPath)).toMatch(/^mutant-[a-f0-9]{8}\.md$/);
    }

    // Clean up
    fs.rmSync(outDir, { recursive: true, force: true });
  });

  it("should handle excluded mutants correctly", () => {
    const report: Report = {
      files: {
        "src/excluded-test.ts": {
          source: `function test() { return true; }`,
          mutants: [
            {
              id: "1",
              mutatorName: "BooleanLiteral",
              status: "Survived",
              location: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 33 },
              },
              replacement: "false",
            },
          ],
        },
      },
    };

    // Create excluded mutants config
    const excludedConfigDir = path.join(tmpdir(), "excluded-config");
    fs.mkdirSync(excludedConfigDir, { recursive: true });
    const configPath = path.join(excludedConfigDir, "equivalent-mutants.json");
    const excludedConfig = {
      version: "1.0.0",
      description: "Test excluded mutants",
      excluded_mutants: [
        {
          id: "1",
          file: "src/excluded-test.ts",
          mutatorName: "BooleanLiteral",
          original_slice: "true",
          replacement: "false",
          location: {
            start: { line: 1, column: 29 },
            end: { line: 1, column: 33 },
          },
          reason: "This is an equivalent mutant for testing",
          category: "equivalent",
          added_by: "test",
          added_at: "2024-01-01T00:00:00Z",
        },
      ],
      categories: {
        equivalent: "Equivalent mutants that don't change behavior",
      },
    };
    fs.writeFileSync(configPath, JSON.stringify(excludedConfig, null, 2));

    const outDir = path.join(tmpdir(), "excluded-mutants-test");
    const {
      jsonl,
      mdPaths,
      excludedJsonl,
      totalMutants,
      excludedMutants,
      fileDirectories,
    } = generateSurvivorReports(report, {
      outDir,
      excludedMutantsPath: configPath,
    });

    // Should have no active survivors (all excluded)
    expect(jsonl).toHaveLength(0);
    expect(mdPaths).toHaveLength(0);
    expect(totalMutants).toBe(0);
    expect(fileDirectories).toHaveLength(0);

    // Should have excluded mutants
    expect(excludedJsonl).toHaveLength(1);
    expect(excludedMutants).toBe(1);

    const excludedData = JSON.parse(excludedJsonl[0] as string);
    expect(excludedData.excluded_reason).toBe(
      "This is an equivalent mutant for testing",
    );
    expect(excludedData.excluded_category).toBe("equivalent");

    // Clean up
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.rmSync(excludedConfigDir, { recursive: true, force: true });
  });
});
