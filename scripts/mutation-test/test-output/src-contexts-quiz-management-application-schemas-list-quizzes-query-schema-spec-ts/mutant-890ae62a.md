# Mutant 890ae62a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 475
**Stable ID**: 890ae62a
**Location**: L301:42–L308:12

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #475
@@ -297,16 +297,9 @@
         (_desc, input, expected, isValid) => {
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
 
-          if (isValid && result.success) {
-            if ("limit" in input) {
-              expect(result.data.limit).toBe(expected);
-            }
-            if ("offset" in input) {
-              expect(result.data.offset).toBe(expected);
-            }
-          }
+          if (isValid && result.success) {}
         },
       );
     });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
