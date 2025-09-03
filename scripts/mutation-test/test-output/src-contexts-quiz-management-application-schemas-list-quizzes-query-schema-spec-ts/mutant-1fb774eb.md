# Mutant 1fb774eb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 341
**Stable ID**: 1fb774eb
**Location**: L180:40–L186:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #341
@@ -176,15 +176,9 @@
         const input = offset === undefined ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
-          if (offset !== undefined) {
-            expect(result.data.offset).toBe(offset);
-          } else {
-            expect(result.data.offset).toBe(0); // default
-          }
-        }
+        if (isValid && result.success) {}
       });
 
       it("should apply default offset when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
