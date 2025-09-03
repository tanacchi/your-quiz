# Mutant 04c8844d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2944
**Stable ID**: 04c8844d
**Location**: L136:9–L136:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2944
@@ -132,9 +132,9 @@
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
-        [null, null],
+        [],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
         const data = { ...validQuizData, answerType };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
