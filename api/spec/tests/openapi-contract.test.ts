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

type OpenApiPropertySchema = {
  default?: unknown;
};

type OpenApiSchema = {
  $ref?: string;
  required?: string[];
  properties?: Record<string, OpenApiPropertySchema>;
  anyOf?: { $ref?: string }[];
};

type OpenApiOperation = {
  responses: Record<
    string,
    { content?: Record<string, { schema?: OpenApiSchema }> }
  >;
};

type OpenApiPathItem = Partial<
  Record<"get" | "post" | "put" | "patch" | "delete", OpenApiOperation>
>;

type OpenApiDocument = {
  paths: Record<string, OpenApiPathItem>;
  components: { schemas: Record<string, OpenApiSchema> };
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

describe("クイズ書き込み系エンドポイントの契約（issue #46）", () => {
  const verbActionPaths = [
    "/api/quiz/v1/manage/quizzes/{id}/submit",
    "/api/quiz/v1/manage/quizzes/{id}/approve",
    "/api/quiz/v1/manage/quizzes/{id}/reject",
    "/api/quiz/v1/manage/quizzes/{id}/publish",
  ] as const;

  it.each(verbActionPaths)("%s が存在しPOST操作を持つ", (pathTemplate) => {
    const pathItem = openApiDoc.paths[pathTemplate];
    expect(pathItem, `${pathTemplate} が定義されていること`).toBeDefined();
    expect(
      pathItem?.post,
      `${pathTemplate} にPOST操作が定義されていること`,
    ).toBeDefined();
  });

  it.each(verbActionPaths)(
    "%s の200レスポンスはQuizResponseを参照する",
    (pathTemplate) => {
      const post = openApiDoc.paths[pathTemplate]?.post;
      const schema =
        post?.responses["200"]?.content?.["application/json"]?.schema;
      expect(schema?.$ref, `${pathTemplate} の200レスポンススキーマ`).toBe(
        "#/components/schemas/QuizResponse",
      );
    },
  );

  it("deleteQuiz (DELETE /quizzes/{id}) は204を返す", () => {
    const deleteOp =
      openApiDoc.paths["/api/quiz/v1/manage/quizzes/{id}"]?.delete;
    expect(deleteOp, "deleteQuiz操作が存在すること").toBeDefined();
    expect(
      Object.keys(deleteOp?.responses ?? {}),
      "deleteQuizは204 No Contentを返すこと",
    ).toContain("204");
  });

  it("CreateQuizRequest.isDraft はrequiredでない", () => {
    const schema = openApiDoc.components.schemas["CreateQuizRequest"];
    expect(schema, "CreateQuizRequestスキーマが存在すること").toBeDefined();
    expect(
      schema?.required ?? [],
      "isDraftがrequired配列に含まれないこと",
    ).not.toContain("isDraft");
    expect(
      schema?.properties,
      "isDraftプロパティ自体は定義されていること",
    ).toHaveProperty("isDraft");
  });

  it("CreateQuizRequest.isDraft にはOpenAPIのdefault値が付与されていない", () => {
    // TypeSpecで`isDraft?: boolean = false`のようにデフォルト値を書くと、
    // OpenAPIドキュメントのrequired配列は変化しない(前のテストは通り続ける)まま
    // `default`キーが付与され、openapi-typescript v7の`defaultNonNullable`
    // (デフォルトtrue)によって生成型`api.d.ts`側だけがrequired化してしまう
    // （実証: deck.tsp `shuffleOrder?: boolean = false` → 生成型でrequired化）。
    // required配列だけを見るテストではこの退行を検出できないため、
    // OpenAPIスキーマの`default`キーの不在を直接検証する。
    const schema = openApiDoc.components.schemas["CreateQuizRequest"];
    expect(
      schema?.properties?.["isDraft"],
      "isDraftプロパティが存在すること",
    ).toBeDefined();
    expect(
      schema?.properties?.["isDraft"],
      "isDraftにdefault値が付与されていないこと（付与されると生成型がrequired化する）",
    ).not.toHaveProperty("default");
  });

  it("UpdateQuizRequest はquestion/explanationのみを持つ", () => {
    const schema = openApiDoc.components.schemas["UpdateQuizRequest"];
    expect(schema, "UpdateQuizRequestスキーマが存在すること").toBeDefined();
    expect(Object.keys(schema?.properties ?? {}).sort()).toEqual([
      "explanation",
      "question",
    ]);
  });

  it.each([
    "/api/quiz/v1/manage/quizzes/{id}/approve",
    "/api/quiz/v1/manage/quizzes/{id}/reject",
  ] as const)(
    "%s はValidationErrorレスポンスを契約に含む(A-1)",
    (pathTemplate) => {
      // 実装は不正なdecision値・S-2のdecision/endpoint不一致で400を返すが、
      // 従来の契約にはValidationErrorが無く実装と乖離していた。
      // TypeSpecのOpenAPI3エミッターは複数のエラーモデルのunionを個別の
      // ステータスコードに分けず、1つの`default`レスポンスのanyOfへ
      // まとめる仕様のため、ステータスコードではなくanyOf内の$refを見る。
      const post = openApiDoc.paths[pathTemplate]?.post;
      expect(post, `${pathTemplate} のPOST操作が存在すること`).toBeDefined();
      const anyOf =
        post?.responses["default"]?.content?.["application/json"]?.schema
          ?.anyOf ?? [];
      expect(
        anyOf.map((s) => s.$ref),
        `${pathTemplate} のdefaultレスポンスがValidationErrorを含むこと`,
      ).toContain("#/components/schemas/ValidationError");
    },
  );

  it("ApprovalRequest.decision はrequired", () => {
    // 実装(QuizWriteController)はdecisionとエンドポイントのverbが矛盾すると
    // 400で拒否する(S-2)。この方針はdecisionが必須であることが前提のため、
    // 契約側で必須性が失われていないことを保証する。
    const schema = openApiDoc.components.schemas["ApprovalRequest"];
    expect(schema, "ApprovalRequestスキーマが存在すること").toBeDefined();
    expect(schema?.required ?? []).toContain("decision");
  });

  it("ApprovalRequest.publishImmediately にはOpenAPIのdefault値が付与されていない", () => {
    const schema = openApiDoc.components.schemas["ApprovalRequest"];
    expect(schema?.properties?.["publishImmediately"]).not.toHaveProperty(
      "default",
    );
  });

  it("/quizzes/{id} はpatchを持ちputを持たない", () => {
    // 本PRはerror-scenarios.tsのPUT表記をPATCHに修正した(fc367b5)。
    // TypeSpec側もPUTを使っていないことをここで固定する。
    const pathItem = openApiDoc.paths["/api/quiz/v1/manage/quizzes/{id}"];
    expect(pathItem?.patch, "PATCH操作が定義されていること").toBeDefined();
    expect(pathItem?.put, "PUT操作は定義されていないこと").toBeUndefined();
  });
});
