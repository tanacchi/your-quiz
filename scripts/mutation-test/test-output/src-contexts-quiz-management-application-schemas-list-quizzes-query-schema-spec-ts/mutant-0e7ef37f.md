# Mutant 0e7ef37f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 473
**Stable ID**: 0e7ef37f
**Location**: L301:15–L301:40

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #473
@@ -297,9 +297,9 @@
         (_desc, input, expected, isValid) => {
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
-          if (isValid && result.success) {
+          if (false) {
             if ("limit" in input) {
               expect(result.data.limit).toBe(expected);
             }
             if ("offset" in input) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
