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

    const { jsonl, mdPaths, totalMutants, fileCount } = generateSurvivorReports(
      report,
      {
        outDir: path.join(tmpdir(), "mutation-reports-1"),
      },
    );

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
    expect(jsonlData.unified_diff).toContain("-  return a + b;");
    expect(jsonlData.unified_diff).toContain("+  return a - b;");

    // Should generate one markdown file per source file
    expect(mdPaths).toHaveLength(1);
    expect(totalMutants).toBe(1);
    expect(fileCount).toBe(1);

    // Check the generated markdown file
    expect(mdPaths[0]).toBeDefined();
    const mdPath = mdPaths[0];
    if (!mdPath) throw new Error("mdPath is undefined");
    const mdContent = fs.readFileSync(mdPath, "utf-8");
    expect(normalize(mdContent)).toContain(
      "# Survived mutants report: src/math/add.ts",
    );
    expect(normalize(mdContent)).toContain("## mutant #1 (ArithmeticOperator)");
    expect(normalize(mdContent)).toContain("Location: L2:12–L2:13");
    expect(normalize(mdContent)).toContain("```diff");
    expect(normalize(mdContent)).toContain(
      "**Hint**: 算術演算子が置換されています（例: + → -）。",
    );
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

    const { jsonl, mdPaths, totalMutants, fileCount } = generateSurvivorReports(
      report,
      {
        outDir: path.join(tmpdir(), "mutation-reports-2"),
      },
    );

    expect(jsonl).toHaveLength(0);
    expect(mdPaths).toHaveLength(0);
    expect(totalMutants).toBe(0);
    expect(fileCount).toBe(0);
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

    const { jsonl } = generateSurvivorReports(report, {
      outDir: path.join(tmpdir(), "mutation-reports-3"),
    });

    expect(jsonl).toHaveLength(3);

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

    const { jsonl, mdPaths, totalMutants, fileCount } = generateSurvivorReports(
      report,
      {
        outDir: path.join(tmpdir(), "mutation-reports-4"),
      },
    );

    // Should skip files without source
    expect(jsonl).toHaveLength(0);
    expect(mdPaths).toHaveLength(0);
    expect(totalMutants).toBe(0);
    expect(fileCount).toBe(0);
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
    const { jsonlPath, mdPaths } = generateSurvivorReports(report, { outDir });

    expect(fs.existsSync(jsonlPath)).toBe(true);
    expect(mdPaths).toHaveLength(1);
    expect(mdPaths[0]).toBeDefined();
    const mdPath = mdPaths[0];
    if (!mdPath) throw new Error("mdPath is undefined");
    expect(fs.existsSync(mdPath)).toBe(true);
    expect(jsonlPath).toBe(path.join(outDir, "survived.jsonl"));
    expect(mdPath).toBe(path.join(outDir, "survived-src-test-ts.md"));

    // Clean up
    fs.rmSync(outDir, { recursive: true, force: true });
  });
});
