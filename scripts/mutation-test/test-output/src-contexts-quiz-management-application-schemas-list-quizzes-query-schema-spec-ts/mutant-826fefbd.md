# Mutant 826fefbd Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 478
**Stable ID**: 826fefbd
**Location**: L302:17–L302:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #478
@@ -298,9 +298,9 @@
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
           if (isValid && result.success) {
-            if ("limit" in input) {
+            if ("" in input) {
               expect(result.data.limit).toBe(expected);
             }
             if ("offset" in input) {
               expect(result.data.offset).toBe(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
