# Mutant f88db68c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 345
**Stable ID**: f88db68c
**Location**: L181:37–L183:12

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #345
@@ -177,11 +177,9 @@
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
-          if (offset !== undefined) {
-            expect(result.data.offset).toBe(offset);
-          } else {
+          if (offset !== undefined) {} else {
             expect(result.data.offset).toBe(0); // default
           }
         }
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
