# Mutant b6f94f64 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2943
**Stable ID**: b6f94f64
**Location**: L135:14–L135:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2943
@@ -131,9 +131,9 @@
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
-        ["", ""],
+        ["", "Stryker was here!"],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
