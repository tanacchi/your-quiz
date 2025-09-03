# Mutant dabe497b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1361
**Stable ID**: dabe497b
**Location**: L606:60–L639:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1361
@@ -602,42 +602,9 @@
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
 
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
+        it("should be equivalent to draft.commit()", () => {});
       });
     });
 
     describe("DraftBase Methods", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
