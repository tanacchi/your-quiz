# Mutant ef12fb48 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2845
**Stable ID**: ef12fb48
**Location**: L76:9–L76:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2845
@@ -72,9 +72,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validQuizData, id: undefined }],
+        [],
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
