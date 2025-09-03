# Mutant 55c53dd3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 351
**Stable ID**: 55c53dd3
**Location**: L193:13–L193:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #351
@@ -189,9 +189,9 @@
       it("should apply default offset when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.offset).toBe(0);
         }
       });
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
