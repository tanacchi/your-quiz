# Mutant cba86ba2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1359
**Stable ID**: cba86ba2
**Location**: L600:31–L603:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1359
@@ -596,12 +596,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
-            // Should suggest patches for missing fields
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
+          if (result.isErr()) {}
         });
 
         it("should be equivalent to draft.commit()", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
