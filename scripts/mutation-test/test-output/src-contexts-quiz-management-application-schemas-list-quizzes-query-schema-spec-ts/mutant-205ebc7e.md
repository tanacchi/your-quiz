# Mutant 205ebc7e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 753
**Stable ID**: 205ebc7e
**Location**: L608:10–L608:49

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #753
@@ -604,9 +604,9 @@
           expect(result.data.status).toHaveLength(2);
         }
       });
 
-      it("should handle quiz-specific filtering", () => {
+      it("", () => {
         const specificQuizRequest = {
           quizId: ["quiz-abc123", "quiz-def456"],
           status: ["approved"],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
