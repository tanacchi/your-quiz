# Mutant 627b1fd5 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 474
**Stable ID**: 627b1fd5
**Location**: L301:15–L301:40

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #474
@@ -297,9 +297,9 @@
         (_desc, input, expected, isValid) => {
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
-          if (isValid && result.success) {
+          if (isValid || result.success) {
             if ("limit" in input) {
               expect(result.data.limit).toBe(expected);
             }
             if ("offset" in input) {
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
