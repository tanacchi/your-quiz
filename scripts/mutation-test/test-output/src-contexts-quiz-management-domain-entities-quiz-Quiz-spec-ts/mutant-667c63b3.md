# Mutant 667c63b3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1345
**Stable ID**: 667c63b3
**Location**: L578:47–L589:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1345
@@ -574,21 +574,10 @@
         });
       });
 
       describe("Edge Cases", () => {
-        it("should handle empty draft", () => {
-          const draft = new Quiz.Draft();
+        it("should handle empty draft", () => {});
 
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
         it("should handle partially filled draft", () => {
           const draft = new Quiz.Draft();
           draft.update("question", "Partial question?");
           draft.update("answerType", "boolean");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
