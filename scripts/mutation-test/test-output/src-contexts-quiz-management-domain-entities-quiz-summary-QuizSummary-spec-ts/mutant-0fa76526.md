# Mutant 0fa76526 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3893
**Stable ID**: 0fa76526
**Location**: L631:9–L631:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3893
@@ -627,9 +627,9 @@
         expect(draft.hasErrors()).toBe(false);
       });
 
       it.each([
-        ["existing field", "question", ""],
+        [],
         ["non-existent field", "nonexistent", ""],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
