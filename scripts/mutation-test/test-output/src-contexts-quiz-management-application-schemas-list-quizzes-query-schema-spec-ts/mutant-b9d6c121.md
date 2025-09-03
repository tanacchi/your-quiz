# Mutant b9d6c121 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 595
**Stable ID**: b9d6c121
**Location**: L419:10–L419:43

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #595
@@ -415,9 +415,9 @@
           expect(result.data.quizId).toHaveLength(1);
         }
       });
 
-      it("should handle very large arrays", () => {
+      it("", () => {
         const largeArray = Array(50)
           .fill("quiz")
           .map((_, i) => `quiz-${i}`);
         const input = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
