# Mutant 8be59a62 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4587
**Stable ID**: 8be59a62
**Location**: L464:61–L504:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4587
@@ -460,50 +460,10 @@
         expect(hasAnswerTypePatch).toBe(true);
       });
 
       describe("Integration with applyEntityPatches", () => {
-        it("should apply multiple patches correctly", () => {
-          const input = {
-            id: "  quiz-123  ",
-            question: "",
-            answerType: "bool" as unknown as "boolean",
-            status: "pending" as unknown as "pending_approval",
-            tagIds: null,
-            solutionId: "solution-456",
-            creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
-          };
+        it("should apply multiple patches correctly", () => {});
 
-          const issues: Issue[] = [
-            { path: ["id"], code: "invalid", message: "Invalid id" },
-            {
-              path: ["question"],
-              code: "invalid",
-              message: "Invalid question",
-            },
-            {
-              path: ["answerType"],
-              code: "invalid",
-              message: "Invalid answerType",
-            },
-            { path: ["status"], code: "invalid", message: "Invalid status" },
-            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
-          ];
-
-          const patches = suggestQuizSummaryPatches(input, issues);
-          const patched: QuizSummaryInput =
-            applyEntityPatches<QuizSummaryInput>(
-              input,
-              patches,
-            ) as QuizSummaryInput;
-
-          expect(patched.id).toBe("quiz-123");
-          expect(patched.question).toBe("Sample question");
-          expect(patched.answerType).toBe("boolean");
-          expect(patched.status).toBe("pending_approval");
-          expect(patched.tagIds).toEqual([]);
-        });
-
         it("should handle function patches correctly", () => {
           const input = {
             tagIds: [
               "valid",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
