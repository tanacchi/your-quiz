import type { Quiz } from "@/types/quiz";
import {
  type AnswerRecord,
  answerRecordSchema,
  type DraftRecord,
  draftRecordSchema,
  type QuizCacheRecord,
  quizCacheRecordSchema,
  quizSchema,
  type SyncQueueItem,
  syncItemActionSchema,
  syncItemTypeSchema,
  syncQueueItemSchema,
} from "./schemas";

describe("schemas", () => {
  describe("answerRecordSchema", () => {
    const valid: AnswerRecord = {
      localId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      sessionId: "session-1",
      quizId: "quiz-1",
      userAnswer: true,
      responseTimeMs: 1200,
      answeredAt: "2026-08-11T00:00:00.000Z",
    };

    describe("正しい値の場合", () => {
      it("検証を通過する", () => {
        expect(answerRecordSchema.safeParse(valid).success).toBe(true);
      });
    });

    describe.each([
      ["localId が UUID でない", { ...valid, localId: "not-a-uuid" }],
      ["sessionId が空文字", { ...valid, sessionId: "" }],
      ["quizId が空文字", { ...valid, quizId: "" }],
      ["responseTimeMs が負数", { ...valid, responseTimeMs: -1 }],
      ["answeredAt が ISO8601 でない", { ...valid, answeredAt: "2026/08/11" }],
      ["必須フィールド欠落", { ...valid, sessionId: undefined }],
    ])("%s の場合", (_label, invalid) => {
      it("検証に失敗する", () => {
        expect(answerRecordSchema.safeParse(invalid).success).toBe(false);
      });
    });

    describe.each([
      ["0ms", 0],
      ["1ms", 1],
      ["最大想定 600000ms", 600_000],
    ])("responseTimeMs が %s の場合", (_label, responseTimeMs) => {
      it("検証を通過する", () => {
        expect(
          answerRecordSchema.safeParse({ ...valid, responseTimeMs }).success,
        ).toBe(true);
      });
    });
  });

  describe("draftRecordSchema", () => {
    const valid: DraftRecord = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      question: "五角形の内角の和は何度？",
      tags: [],
      createdAt: "2026-08-11T00:00:00.000Z",
      updatedAt: "2026-08-11T00:00:00.000Z",
    };

    describe("正解・解説を省略した場合", () => {
      it("検証を通過する", () => {
        expect(draftRecordSchema.safeParse(valid).success).toBe(true);
      });
    });

    describe("正解・解説を指定した場合", () => {
      it("検証を通過する", () => {
        expect(
          draftRecordSchema.safeParse({
            ...valid,
            correctAnswer: true,
            explanation: "五角形の内角の和は540度である。",
          }).success,
        ).toBe(true);
      });
    });

    describe.each([
      ["0字", ""],
      ["1字", "あ"],
      ["500字", "あ".repeat(500)],
    ])("question が %s の場合", (_label, question) => {
      it("検証を通過する", () => {
        expect(
          draftRecordSchema.safeParse({ ...valid, question }).success,
        ).toBe(true);
      });
    });

    describe("question が 501字 の場合", () => {
      it("検証に失敗する", () => {
        expect(
          draftRecordSchema.safeParse({ ...valid, question: "あ".repeat(501) })
            .success,
        ).toBe(false);
      });
    });

    describe.each([
      ["0件", []],
      ["1件", ["数学"]],
      ["10件", Array.from({ length: 10 }, (_, i) => `タグ${i}`)],
    ])("tags が %s の場合", (_label, tags) => {
      it("検証を通過する", () => {
        expect(draftRecordSchema.safeParse({ ...valid, tags }).success).toBe(
          true,
        );
      });
    });

    describe("id が UUID でない場合", () => {
      it("検証に失敗する", () => {
        expect(
          draftRecordSchema.safeParse({ ...valid, id: "not-a-uuid" }).success,
        ).toBe(false);
      });
    });
  });

  describe("syncItemTypeSchema", () => {
    describe.each([["answer"], ["draft"], ["session"], ["preference"]])(
      "%s の場合",
      (type) => {
        it("検証を通過する", () => {
          expect(syncItemTypeSchema.safeParse(type).success).toBe(true);
        });
      },
    );

    describe("未定義の値の場合", () => {
      it("検証に失敗する", () => {
        expect(syncItemTypeSchema.safeParse("unknown").success).toBe(false);
      });
    });
  });

  describe("syncItemActionSchema", () => {
    describe.each([["create"], ["update"], ["delete"]])(
      "%s の場合",
      (action) => {
        it("検証を通過する", () => {
          expect(syncItemActionSchema.safeParse(action).success).toBe(true);
        });
      },
    );

    describe("未定義の値の場合", () => {
      it("検証に失敗する", () => {
        expect(syncItemActionSchema.safeParse("unknown").success).toBe(false);
      });
    });
  });

  describe("syncQueueItemSchema", () => {
    const valid: SyncQueueItem = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      type: "answer",
      action: "create",
      data: { quizId: "quiz-1" },
      timestamp: "2026-08-11T00:00:00.000Z",
      checksum: "d41d8cd98f00b204e9800998ecf8427e",
    };

    describe("正しい値の場合", () => {
      it("検証を通過する", () => {
        expect(syncQueueItemSchema.safeParse(valid).success).toBe(true);
      });
    });

    describe.each([
      ["type が不正", { ...valid, type: "invalid" }],
      ["action が不正", { ...valid, action: "invalid" }],
      ["data がオブジェクトでない", { ...valid, data: "not-an-object" }],
      ["id が UUID でない", { ...valid, id: "not-a-uuid" }],
    ])("%s の場合", (_label, invalid) => {
      it("検証に失敗する", () => {
        expect(syncQueueItemSchema.safeParse(invalid).success).toBe(false);
      });
    });
  });

  describe("quizSchema", () => {
    const valid: Quiz = {
      id: "quiz-1",
      question: "五角形の内角の和は何度？",
      answerType: "boolean",
      status: "未解答",
      tags: ["数学", "図形"],
      hasExplanation: true,
    };

    describe("正しい値の場合", () => {
      it("検証を通過する", () => {
        expect(quizSchema.safeParse(valid).success).toBe(true);
      });
    });

    describe("isOfflineAvailable を指定した場合", () => {
      it("検証を通過する", () => {
        expect(
          quizSchema.safeParse({ ...valid, isOfflineAvailable: true }).success,
        ).toBe(true);
      });
    });

    describe("Quiz 型との等価性", () => {
      it("z.infer が Quiz 型と一致する", () => {
        expectTypeOf<typeof valid>().toEqualTypeOf<Quiz>();
      });
    });
  });

  describe("quizCacheRecordSchema", () => {
    const validQuiz: Quiz = {
      id: "quiz-1",
      question: "五角形の内角の和は何度？",
      answerType: "boolean",
      status: "未解答",
      tags: [],
      hasExplanation: false,
    };
    const valid: QuizCacheRecord = {
      id: "quiz-1",
      quiz: validQuiz,
      cachedAt: 0,
      expiresAt: 86_400_000,
    };

    describe("正しい値の場合", () => {
      it("検証を通過する", () => {
        expect(quizCacheRecordSchema.safeParse(valid).success).toBe(true);
      });
    });

    describe.each([
      ["cachedAt が負数", { ...valid, cachedAt: -1 }],
      ["expiresAt が負数", { ...valid, expiresAt: -1 }],
      ["quiz が不正", { ...valid, quiz: { id: "quiz-1" } }],
    ])("%s の場合", (_label, invalid) => {
      it("検証に失敗する", () => {
        expect(quizCacheRecordSchema.safeParse(invalid).success).toBe(false);
      });
    });
  });
});
