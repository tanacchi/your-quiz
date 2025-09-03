# Mutant 5d3990f6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 416
**Stable ID**: 5d3990f6
**Location**: L270:10–L270:52

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #416
@@ -266,9 +266,9 @@
           expect(result.data.quizId).toEqual(["quiz-1"]);
         }
       });
 
-      it("should coerce string numbers to integers", () => {
+      it("", () => {
         const rawInput = {
           limit: "25",
           offset: "100",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
