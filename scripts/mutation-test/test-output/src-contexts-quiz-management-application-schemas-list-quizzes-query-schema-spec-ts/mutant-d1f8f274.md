# Mutant d1f8f274 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 483
**Stable ID**: d1f8f274
**Location**: L305:36–L307:14

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #483
@@ -301,11 +301,9 @@
           if (isValid && result.success) {
             if ("limit" in input) {
               expect(result.data.limit).toBe(expected);
             }
-            if ("offset" in input) {
-              expect(result.data.offset).toBe(expected);
-            }
+            if ("offset" in input) {}
           }
         },
       );
     });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
