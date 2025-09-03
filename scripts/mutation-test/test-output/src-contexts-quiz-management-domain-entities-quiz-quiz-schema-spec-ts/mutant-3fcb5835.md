# Mutant 3fcb5835 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3207
**Stable ID**: 3fcb5835
**Location**: L422:43–L492:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3207
@@ -418,76 +418,6 @@
       });
     });
   });
 
-  describe("Integration Scenarios", () => {
-    it("should handle complete approved boolean quiz", () => {
-      const fullApprovedQuiz = {
-        id: "quiz-integration-123",
-        question: "Is TypeScript strongly typed? 💪",
-        answerType: "boolean" as const,
-        solution: {
-          id: "solution-integration-456",
-          value: true,
-        },
-        explanation:
-          "TypeScript provides static type checking at compile time, making it strongly typed compared to vanilla JavaScript.",
-        status: "approved" as const,
-        creatorId: "creator-expert-789",
-        createdAt: "2023-12-01 10:00:00",
-        approvedAt: "2023-12-02 15:30:00",
-      };
-
-      const result = QuizSchema.safeParse(fullApprovedQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.answerType).toBe("boolean");
-        expect(result.data.solution.value).toBe(true);
-        expect(result.data.status).toBe("approved");
-        expect(result.data.approvedAt).toBeDefined();
-        expect(result.data.explanation).toBeDefined();
-      }
-    });
-
-    it("should handle minimal valid boolean quiz", () => {
-      const minimalQuiz = {
-        id: "q",
-        question: "Yes?",
-        answerType: "boolean" as const,
-        solution: {
-          id: "s",
-          value: false,
-        },
-        status: "pending_approval" as const,
-        creatorId: "c",
-        createdAt: "2023-12-01 10:00:00",
-      };
-
-      const result = QuizSchema.safeParse(minimalQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.solution.value).toBe(false);
-      }
-    });
-
-    it("should handle rejected quiz with explanation", () => {
-      const rejectedQuiz = {
-        ...validQuizData,
-        status: "rejected" as const,
-        explanation: "This quiz was rejected due to unclear wording.",
-      };
-
-      const result = QuizSchema.safeParse(rejectedQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.status).toBe("rejected");
-        expect(result.data.approvedAt).toBeUndefined();
-        expect(result.data.explanation).toContain("rejected");
-      }
-    });
-  });
+  describe("Integration Scenarios", () => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
