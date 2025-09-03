# Mutant 6fbea7fa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2863
**Stable ID**: 6fbea7fa
**Location**: L82:9–L82:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2863
@@ -78,9 +78,9 @@
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
-        ["createdAt", { ...validQuizData, createdAt: undefined }],
+        [],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
