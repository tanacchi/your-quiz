# Mutant 276df5f3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2854
**Stable ID**: 276df5f3
**Location**: L79:9–L79:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2854
@@ -75,9 +75,9 @@
       it.each([
         ["id", { ...validQuizData, id: undefined }],
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
-        ["solution", { ...validQuizData, solution: undefined }],
+        [],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
