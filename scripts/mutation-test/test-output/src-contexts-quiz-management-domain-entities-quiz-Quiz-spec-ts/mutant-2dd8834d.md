# Mutant 2dd8834d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1343
**Stable ID**: 2dd8834d
**Location**: L577:36–L640:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1343
@@ -573,72 +573,9 @@
           expect(draft.get("solution")).toEqual(originalSolution);
         });
       });
 
-      describe("Edge Cases", () => {
-        it("should handle empty draft", () => {
-          const draft = new Quiz.Draft();
-
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            // Should have multiple validation errors for missing required fields
-            expect(result.error.issues.length).toBeGreaterThan(0);
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
-        });
-
-        it("should handle partially filled draft", () => {
-          const draft = new Quiz.Draft();
-          draft.update("question", "Partial question?");
-          draft.update("answerType", "boolean");
-          // Missing other required fields
-
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            // Should suggest patches for missing fields
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
-        });
-
-        it("should be equivalent to draft.commit()", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-equivalent",
-            question: "Are fromDraft and commit equivalent?",
-            answerType: "boolean",
-            solution: { id: "sol-equivalent", value: true },
-            status: "pending_approval",
-            creatorId: "creator-equivalent",
-            createdAt: "2023-12-01 10:00:00",
-          });
-
-          const fromDraftResult = Quiz.fromDraft(draft);
-          const commitResult = draft.commit();
-
-          // Both methods should return identical results
-          expect(fromDraftResult.isOk()).toBe(commitResult.isOk());
-
-          if (fromDraftResult.isOk() && commitResult.isOk()) {
-            const fromDraftQuiz = fromDraftResult.value;
-            const commitQuiz = commitResult.value;
-
-            expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
-            expect(fromDraftQuiz.get("question")).toBe(
-              commitQuiz.get("question"),
-            );
-            expect(fromDraftQuiz.get("answerType")).toBe(
-              commitQuiz.get("answerType"),
-            );
-            expect(fromDraftQuiz.getSolution().get("value")).toBe(
-              commitQuiz.getSolution().get("value"),
-            );
-          }
-        });
-      });
+      describe("Edge Cases", () => {});
     });
 
     describe("DraftBase Methods", () => {
       describe("applyPatches method", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
