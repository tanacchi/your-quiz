# Mutant 9f1b44d3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 352
**Stable ID**: 9f1b44d3
**Location**: L193:29–L195:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #352
@@ -189,11 +189,9 @@
       it("should apply default offset when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.offset).toBe(0);
-        }
+        if (result.success) {}
       });
     });
 
     describe("Complex Validation Scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
