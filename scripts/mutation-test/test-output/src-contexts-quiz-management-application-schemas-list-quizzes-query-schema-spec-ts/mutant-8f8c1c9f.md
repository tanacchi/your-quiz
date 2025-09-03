# Mutant 8f8c1c9f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 479
**Stable ID**: 8f8c1c9f
**Location**: L302:35–L304:14

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #479
@@ -298,11 +298,9 @@
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
           if (isValid && result.success) {
-            if ("limit" in input) {
-              expect(result.data.limit).toBe(expected);
-            }
+            if ("limit" in input) {}
             if ("offset" in input) {
               expect(result.data.offset).toBe(expected);
             }
           }
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
