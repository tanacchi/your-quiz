# Mutant 70464c5d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3897
**Stable ID**: 70464c5d
**Location**: L632:9–L632:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3897
@@ -628,9 +628,9 @@
       });
 
       it.each([
         ["existing field", "question", ""],
-        ["non-existent field", "nonexistent", ""],
+        [],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
         }
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
