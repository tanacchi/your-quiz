# Mutant 394a4d69 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 598
**Stable ID**: 394a4d69
**Location**: L421:17–L421:23

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #598
@@ -417,9 +417,9 @@
       });
 
       it("should handle very large arrays", () => {
         const largeArray = Array(50)
-          .fill("quiz")
+          .fill("")
           .map((_, i) => `quiz-${i}`);
         const input = {
           quizId: largeArray,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
