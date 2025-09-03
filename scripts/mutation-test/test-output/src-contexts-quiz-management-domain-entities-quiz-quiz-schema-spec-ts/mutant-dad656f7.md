# Mutant dad656f7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2940
**Stable ID**: dad656f7
**Location**: L134:26–L134:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2940
@@ -130,9 +130,9 @@
       it.each([
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
-        ["invalid_type", "invalid_type"],
+        ["invalid_type", ""],
         ["", ""],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
