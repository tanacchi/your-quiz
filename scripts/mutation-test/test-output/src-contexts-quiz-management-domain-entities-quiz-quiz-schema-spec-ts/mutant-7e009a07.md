# Mutant 7e009a07 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2941
**Stable ID**: 7e009a07
**Location**: L135:9–L135:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2941
@@ -131,9 +131,9 @@
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
-        ["", ""],
+        [],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
