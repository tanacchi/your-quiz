# Mutant ff531c23 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1351
**Stable ID**: ff531c23
**Location**: L591:58–L604:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1351
@@ -587,23 +587,10 @@
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
 
-        it("should handle partially filled draft", () => {
-          const draft = new Quiz.Draft();
-          draft.update("question", "Partial question?");
-          draft.update("answerType", "boolean");
-          // Missing other required fields
+        it("should handle partially filled draft", () => {});
 
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            // Should suggest patches for missing fields
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
-        });
-
         it("should be equivalent to draft.commit()", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-equivalent",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
