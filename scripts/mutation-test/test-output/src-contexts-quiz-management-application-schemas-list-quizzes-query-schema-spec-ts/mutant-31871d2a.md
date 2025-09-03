# Mutant 31871d2a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 481
**Stable ID**: 31871d2a
**Location**: L305:17–L305:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #481
@@ -301,9 +301,9 @@
           if (isValid && result.success) {
             if ("limit" in input) {
               expect(result.data.limit).toBe(expected);
             }
-            if ("offset" in input) {
+            if (false) {
               expect(result.data.offset).toBe(expected);
             }
           }
         },
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
