# Mutant e631f3c7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5360
**Stable ID**: e631f3c7
**Location**: L382:51–L427:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5360
@@ -378,51 +378,6 @@
       });
     });
   });
 
-  describe("Complex Integration Scenarios", () => {
-    it("should handle approved quiz with all fields", () => {
-      const fullApprovedQuiz = {
-        id: "quiz-complex-123",
-        question: "Complex TypeScript question with unicode: 🚀",
-        answerType: "multiple_choice" as const,
-        solutionId: "solution-complex-456",
-        explanation: "Detailed explanation with special chars & unicode",
-        tagIds: ["typescript", "advanced", "web-dev"],
-        status: "approved" as const,
-        creatorId: "creator-expert-789",
-        createdAt: "2023-12-01 10:00:00",
-        approvedAt: "2023-12-02 15:30:00",
-      };
-
-      const result = QuizSummarySchema.safeParse(fullApprovedQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.tagIds).toHaveLength(3);
-        expect(result.data.status).toBe("approved");
-        expect(result.data.approvedAt).toBeDefined();
-      }
-    });
-
-    it("should handle minimal valid quiz", () => {
-      const minimalQuiz = {
-        id: "q",
-        question: "Q?",
-        answerType: "boolean" as const,
-        solutionId: "s",
-        status: "pending_approval" as const,
-        creatorId: "c",
-        createdAt: "2023-12-01 10:00:00",
-      };
-
-      const result = QuizSummarySchema.safeParse(minimalQuiz);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.tagIds).toEqual([]);
-        expect(result.data.explanation).toBeUndefined();
-        expect(result.data.approvedAt).toBeUndefined();
-      }
-    });
-  });
+  describe("Complex Integration Scenarios", () => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
