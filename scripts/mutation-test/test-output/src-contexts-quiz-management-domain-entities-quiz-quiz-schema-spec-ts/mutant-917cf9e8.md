# Mutant 917cf9e8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2851
**Stable ID**: 917cf9e8
**Location**: L78:9–L78:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2851
@@ -74,9 +74,9 @@
 
       it.each([
         ["id", { ...validQuizData, id: undefined }],
         ["question", { ...validQuizData, question: undefined }],
-        ["answerType", { ...validQuizData, answerType: undefined }],
+        [],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
