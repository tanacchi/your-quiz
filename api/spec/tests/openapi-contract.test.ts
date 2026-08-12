/**
 * @file openapi-contract.test.ts
 * @description TypeSpecからコンパイルされたOpenAPIドキュメントの契約検証。
 *
 * `tsp compile` はパステンプレートのパラメータ名違い（例: `/sessions/{id}/answers`
 * と `/sessions/{sessionId}/answers`）を検出せず、OpenAPI 3.1が禁止する
 * 「同一階層で異なるテンプレート名を持つパス」を素通りさせてしまう
 * （PR #61 レビューで発覚した実際のリグレッション）。
 * このテストはコンパイル結果に対して直接そのクラスの不整合を検出する。
 */

import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const specRoot = path.resolve(__dirname, "..");

type OpenApiOperation = {
  responses: Record<string, unknown>;
};

type OpenApiPathItem = Partial<
  Record<"get" | "post" | "put" | "patch" | "delete", OpenApiOperation>
>;

type OpenApiDocument = {
  paths: Record<string, OpenApiPathItem>;
};

let openApiDoc: OpenApiDocument;
let outDir: string;

beforeAll(() => {
  outDir = fs.mkdtempSync(path.join(os.tmpdir(), "tsp-contract-test-"));
  const outputFile = "contract.json";

  // 生成物(generated/api.yaml)はgitignore対象でbuild実行順序に依存するため、
  // テスト自身がJSON形式で独立にコンパイルし、生成結果を直接検証する。
  execFileSync(
    "tsp",
    [
      "compile",
      ".",
      "--option",
      "@typespec/openapi3.file-type=json",
      "--option",
      `@typespec/openapi3.output-file=${outputFile}`,
      "--option",
      `@typespec/openapi3.emitter-output-dir=${outDir}`,
    ],
    { cwd: specRoot, stdio: "pipe" },
  );

  const raw = fs.readFileSync(path.join(outDir, outputFile), "utf-8");
  openApiDoc = JSON.parse(raw);
});

afterAll(() => {
  fs.rmSync(outDir, { recursive: true, force: true });
});

/**
 * `/a/{foo}/b` と `/a/{bar}/b` のように、テンプレート変数名だけが異なる
 * 同一階層のパスを正規化して比較できる形にする。
 */
function normalizePathTemplate(pathTemplate: string): string {
  return pathTemplate.replace(/\{[^}]+\}/g, "{}");
}

describe("OpenAPI契約", () => {
  it("同一階層で異なるテンプレート名を持つパスが存在しない", () => {
    const paths = Object.keys(openApiDoc.paths);
    const byNormalized = new Map<string, string[]>();

    for (const p of paths) {
      const normalized = normalizePathTemplate(p);
      const bucket = byNormalized.get(normalized) ?? [];
      bucket.push(p);
      byNormalized.set(normalized, bucket);
    }

    const collisions = [...byNormalized.entries()].filter(
      ([, variants]) => variants.length > 1,
    );

    expect(
      collisions,
      `OpenAPI 3.1は同一階層で異なるテンプレート名を持つパスを禁止している。検出された衝突: ${JSON.stringify(collisions)}`,
    ).toEqual([]);
  });

  it("submitAnswer (POST /sessions/{id}/answers) は201 Createdを返す", () => {
    const answersPath =
      openApiDoc.paths["/api/quiz/v1/learning/sessions/{id}/answers"];
    expect(answersPath, "セッション回答パスが存在すること").toBeDefined();

    const post = answersPath?.post;
    expect(post, "answersパスにPOST操作が定義されていること").toBeDefined();
    if (!post) return;

    expect(
      Object.keys(post.responses),
      "submitAnswerは新規Attempt作成のため201を返すこと",
    ).toContain("201");
  });

  it("同一URLに対してGETとPOSTが1つのpath itemとして統合されている", () => {
    const answersPath =
      openApiDoc.paths["/api/quiz/v1/learning/sessions/{id}/answers"];
    expect(
      answersPath?.get,
      "getSessionAnswersが同一path item内に存在すること",
    ).toBeDefined();
    expect(
      answersPath?.post,
      "submitAnswerが同一path item内に存在すること",
    ).toBeDefined();
  });
});
