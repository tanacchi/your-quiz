# Mutant 8a98c9f6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5362
**Stable ID**: 8a98c9f6
**Location**: L383:61–L405:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5362
@@ -379,32 +379,10 @@
     });
   });
 
   describe("Complex Integration Scenarios", () => {
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
+    it("should handle approved quiz with all fields", () => {});
 
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
     it("should handle minimal valid quiz", () => {
       const minimalQuiz = {
         id: "q",
         question: "Q?",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
