# Mutant 1dc75ebb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 471
**Stable ID**: 1dc75ebb
**Location**: L297:46–L309:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #471
@@ -293,21 +293,9 @@
         ["negative limit string", { limit: "-5" }, -5, false],
         ["negative offset string", { offset: "-1" }, -1, false],
       ])(
         "should handle numeric coercion: %s",
-        (_desc, input, expected, isValid) => {
-          const result = listQueryFromReq.safeParse(input);
-          expect(result.success).toBe(isValid);
-
-          if (isValid && result.success) {
-            if ("limit" in input) {
-              expect(result.data.limit).toBe(expected);
-            }
-            if ("offset" in input) {
-              expect(result.data.offset).toBe(expected);
-            }
-          }
-        },
+        (_desc, input, expected, isValid) => {},
       );
     });
 
     describe("Pipeline Integration", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
