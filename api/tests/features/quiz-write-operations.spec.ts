import { spec } from "pactum";
import {
  buildCreateQuizPayload,
  notFoundScenarios,
  quizWriteEndpoints,
} from "../fixtures/quiz-write-data";
import {
  newFingerprint,
  withFingerprint,
} from "../helpers/fingerprint-helpers";

// Quiz Write Operations BDD Tests - クイズ書き込み操作BDDテスト
// issue #46 / ADR-0027: PATCH/DELETE 501解消・下書き保存・承認ワークフロー
//
// 各itはfingerprintをUUID v4で都度発行し、自分でPOSTしてから操作することで
// テスト間の状態依存を作らない(MockQuizRepositoryはリクエストを跨いで
// 永続化されるが、テスト同士が互いのデータへ影響しない設計とする)。
//
// 注意(BDD規約、D-7): 本ファイルが作るクイズはBDDスイート全体で共有される
// MockQuizStoreに永続化され、他のBDDファイル(quiz-list-search.spec.ts等)
// からも見える。この汚染から安全でいるためには、一覧・検索系のアサーション
// を「自分がPOSTしたIDが含まれる/含まれない」に限定し、`totalCount`の
// 絶対値や「特定条件で0件になる」ことを検証する場合は、他のテストが
// 作りうるデータに絶対に一致しないフィルタ（存在しないcreatorId/quizId等、
// tests/fixtures/quiz-search-data.tsのemptyResultScenarios参照）でのみ行う。

describe("Quiz Write Operations - クイズ書き込み操作", () => {
  describe("下書き保存: Draft creation", () => {
    it("isDraft: trueで作成するとstatus draftになる", async () => {
      // Given: 新規fingerprint
      const fp = newFingerprint();

      // When: isDraft: trueでクイズを作成
      const response = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      // Then: status は draft
      expect(response.json).toHaveProperty("status", "draft");
    });

    it.each([
      ["isDraftを省略", {}],
      ["isDraft: false", { isDraft: false }],
    ])("%s の場合はstatus pending_approvalになる", async (_desc, overrides) => {
      // Given
      const fp = newFingerprint();

      // When
      const response = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload(overrides))
        .expectStatus(201);

      // Then
      expect(response.json).toHaveProperty("status", "pending_approval");
    });
  });

  describe("正常系ワークフロー: draft → submit → approve → publish", () => {
    it("下書き作成から公開までの一連のステータス遷移が成功する", async () => {
      // Given: 下書きを作成
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);
      const id = created.json.id;
      expect(created.json.status).toBe("draft");

      // When: 作成者がPATCHで内容を更新
      const updated = await withFingerprint(
        spec().patch(quizWriteEndpoints.byId(id)),
        fp,
      )
        .withJson({ question: "Updated question for workflow test" })
        .expectStatus(200);
      // Then: PATCHはステータスを変更しない
      expect(updated.json.status).toBe("draft");
      expect(updated.json.question).toBe("Updated question for workflow test");

      // When: 作成者がsubmitする
      const submitted = await withFingerprint(
        spec().post(quizWriteEndpoints.submit(id)),
        fp,
      ).expectStatus(200);
      expect(submitted.json.status).toBe("pending_approval");

      // When: モデレーターがapproveする(dev-mock環境はNODE_ENV!==productionのため許可)
      const approved = await spec()
        .post(quizWriteEndpoints.approve(id))
        .withJson({ decision: "approved", reviewerNotes: "LGTM" })
        .expectStatus(200);
      expect(approved.json.status).toBe("approved");
      expect(approved.json.approvedAt).toBeDefined();

      // When: モデレーターがpublishする
      const published = await spec()
        .post(quizWriteEndpoints.publish(id))
        .expectStatus(200);
      // Then: 公開状態になる
      expect(published.json.status).toBe("published");

      // And: GETでも公開状態が確認できる
      const fetched = await spec()
        .get(quizWriteEndpoints.byId(id))
        .expectStatus(200);
      expect(fetched.json.status).toBe("published");
    });

    it("却下されたクイズは再submitでpending_approvalに戻せる", async () => {
      // Given: 承認待ちのクイズを作成
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload())
        .expectStatus(201);
      const id = created.json.id;

      // When: モデレーターがrejectする
      const rejected = await spec()
        .post(quizWriteEndpoints.reject(id))
        .withJson({ decision: "rejected", reviewerNotes: "要修正" })
        .expectStatus(200);
      expect(rejected.json.status).toBe("rejected");

      // Then: rejected状態でもPATCHできる
      await withFingerprint(spec().patch(quizWriteEndpoints.byId(id)), fp)
        .withJson({ question: "Revised question" })
        .expectStatus(200);

      // When: 作成者が再submitする
      const resubmitted = await withFingerprint(
        spec().post(quizWriteEndpoints.submit(id)),
        fp,
      ).expectStatus(200);
      // Then: pending_approvalに戻る
      expect(resubmitted.json.status).toBe("pending_approval");
    });
  });

  describe("削除: DELETE /quizzes/:id", () => {
    it("作成者が削除すると204を返し、以降のGETは404になる", async () => {
      // Given
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);
      const id = created.json.id;

      // When
      const response = await withFingerprint(
        spec().delete(quizWriteEndpoints.byId(id)),
        fp,
      ).expectStatus(204);

      // Then: レスポンスボディは空
      expect(response.body).toBeFalsy();

      // And: 削除後のGETは404
      await spec().get(quizWriteEndpoints.byId(id)).expectStatus(404);
    });
  });

  describe("異常系: エラーハンドリング", () => {
    it.each(notFoundScenarios)(
      "$description: 存在しないクイズIDは404を返す",
      async ({ method, pathSuffix }) => {
        // Given: 存在しないクイズID
        // When: 各書き込み系操作(PATCH/DELETE/submit/approve/reject/publish)を実行
        // Then: 404を返す
        const path = `${quizWriteEndpoints.byId("non-existent-quiz-id")}${pathSuffix}`;
        let request = spec();

        switch (method) {
          case "PATCH":
            request = request.patch(path).withJson({ question: "x" });
            break;
          case "DELETE":
            request = request.delete(path);
            break;
          case "POST":
            request = request.post(path);
            if (pathSuffix === "/approve" || pathSuffix === "/reject") {
              request = request.withJson({
                decision: pathSuffix === "/approve" ? "approved" : "rejected",
              });
            }
            break;
        }

        await request.expectStatus(404);
      },
    );

    it("作成者以外がPATCHすると403を返す", async () => {
      // Given: ownerがdraftクイズを作成
      const owner = newFingerprint();
      const stranger = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        owner,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      // When: 別のfingerprint(stranger)がPATCHする
      // Then: 403を返す
      await withFingerprint(
        spec().patch(quizWriteEndpoints.byId(created.json.id)),
        stranger,
      )
        .withJson({ question: "hijacked" })
        .expectStatus(403);
    });

    it("作成者以外がDELETEすると403を返す", async () => {
      // Given: ownerがdraftクイズを作成
      const owner = newFingerprint();
      const stranger = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        owner,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      // When: 別のfingerprint(stranger)がDELETEする
      // Then: 403を返す
      await withFingerprint(
        spec().delete(quizWriteEndpoints.byId(created.json.id)),
        stranger,
      ).expectStatus(403);
    });

    it("作成者以外がsubmitすると403を返す", async () => {
      // Given: ownerがdraftクイズを作成
      const owner = newFingerprint();
      const stranger = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        owner,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      // When: 別のfingerprint(stranger)がsubmitする
      // Then: 403を返す(submitはrequiresModeration=falseのため所有者確認が働く)
      await withFingerprint(
        spec().post(quizWriteEndpoints.submit(created.json.id)),
        stranger,
      ).expectStatus(403);
    });

    it("approved状態のクイズへのPATCHは409を返す", async () => {
      // Given: pending_approvalのクイズを作成しapproveする
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload())
        .expectStatus(201);
      const id = created.json.id;
      await spec()
        .post(quizWriteEndpoints.approve(id))
        .withJson({ decision: "approved" })
        .expectStatus(200);

      // When: approved状態のクイズを作成者がPATCHする
      // Then: 409を返す(canBeUpdated()はdraft/pending_approval/rejectedのみ許可)
      await withFingerprint(spec().patch(quizWriteEndpoints.byId(id)), fp)
        .withJson({ question: "should fail" })
        .expectStatus(409);
    });

    it("approved状態のクイズへのDELETEは409を返す", async () => {
      // Given: pending_approvalのクイズを作成しapproveする
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload())
        .expectStatus(201);
      const id = created.json.id;
      await spec()
        .post(quizWriteEndpoints.approve(id))
        .withJson({ decision: "approved" })
        .expectStatus(200);

      // When: approved状態のクイズを作成者がDELETEする
      // Then: 409を返す(canBeDeleted()はapproved/published以外のみ許可)
      await withFingerprint(
        spec().delete(quizWriteEndpoints.byId(id)),
        fp,
      ).expectStatus(409);
    });

    it("draft状態のクイズをapproveすると409を返す", async () => {
      // Given: isDraft:trueでdraft状態のクイズを作成
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      // When: pending_approvalを経ずdraftから直接approveする
      // Then: 409を返す(approveの遷移元はpending_approvalのみ)
      await spec()
        .post(quizWriteEndpoints.approve(created.json.id))
        .withJson({ decision: "approved" })
        .expectStatus(409);
    });

    it("pending_approval状態のクイズをapproveせずpublishすると409を返す", async () => {
      // Given: isDraft省略でpending_approval状態のクイズを作成
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload())
        .expectStatus(201);

      // When: approveを経ずに直接publishする
      // Then: publishはapproved状態のみ許可するため409を返す
      await spec()
        .post(quizWriteEndpoints.publish(created.json.id))
        .expectStatus(409);
    });

    it("空オブジェクト({})でのPATCHは400を返す(question/explanationどちらも未指定)", async () => {
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      await withFingerprint(
        spec().patch(quizWriteEndpoints.byId(created.json.id)),
        fp,
      )
        .withJson({})
        .expectStatus(400);
    });

    // A-2回帰テスト: 本物の空ボディ・壊れたJSONはparseJsonSafe経由の
    // JsonParseErrorになる。旧実装はInternalServerErrorを継承し500を
    // 返していたが、クライアント起因の不備なので400が正しい。
    it("本物の空ボディ(Content-Lengthゼロ)でのPATCHは400を返す", async () => {
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      await withFingerprint(
        spec()
          .patch(quizWriteEndpoints.byId(created.json.id))
          .withHeaders("Content-Type", "application/json"),
        fp,
      )
        .withBody("")
        .expectStatus(400);
    });

    it("壊れたJSONでのPATCHは400を返す", async () => {
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload({ isDraft: true }))
        .expectStatus(201);

      await withFingerprint(
        spec()
          .patch(quizWriteEndpoints.byId(created.json.id))
          .withHeaders("Content-Type", "application/json"),
        fp,
      )
        .withBody('{"question":')
        .expectStatus(400);
    });

    it("ボディ必須のapproveに空ボディを送ると400を返す(承認必須エンドポイントでの最も起きやすいクライアントミス)", async () => {
      const fp = newFingerprint();
      const created = await withFingerprint(
        spec().post(quizWriteEndpoints.base),
        fp,
      )
        .withJson(buildCreateQuizPayload())
        .expectStatus(201);

      await spec()
        .post(quizWriteEndpoints.approve(created.json.id))
        .withHeaders("Content-Type", "application/json")
        .withBody("")
        .expectStatus(400);
    });
  });
});
