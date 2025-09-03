# Mutant 6e09c8de Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2938
**Stable ID**: 6e09c8de
**Location**: L134:9–L134:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2938
@@ -130,9 +130,9 @@
       it.each([
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
-        ["invalid_type", "invalid_type"],
+        [],
         ["", ""],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
