# Mutant 315c7c4a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 482
**Stable ID**: 315c7c4a
**Location**: L305:17–L305:25

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #482
@@ -301,9 +301,9 @@
           if (isValid && result.success) {
             if ("limit" in input) {
               expect(result.data.limit).toBe(expected);
             }
-            if ("offset" in input) {
+            if ("" in input) {
               expect(result.data.offset).toBe(expected);
             }
           }
         },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
