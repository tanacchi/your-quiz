# Mutant dcdb67fe Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 477
**Stable ID**: dcdb67fe
**Location**: L302:17–L302:33

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #477
@@ -298,9 +298,9 @@
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
           if (isValid && result.success) {
-            if ("limit" in input) {
+            if (false) {
               expect(result.data.limit).toBe(expected);
             }
             if ("offset" in input) {
               expect(result.data.offset).toBe(expected);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
