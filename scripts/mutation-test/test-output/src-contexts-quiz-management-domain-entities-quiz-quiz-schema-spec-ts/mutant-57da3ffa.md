# Mutant 57da3ffa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2935
**Stable ID**: 57da3ffa
**Location**: L133:9–L133:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2935
@@ -129,9 +129,9 @@
 
       it.each([
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
-        ["free_text", "free_text"],
+        [],
         ["invalid_type", "invalid_type"],
         ["", ""],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
