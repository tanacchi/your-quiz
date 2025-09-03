# Mutant f9c6e09d Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 787
**Stable ID**: f9c6e09d
**Location**: L647:25–L647:32

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #787
@@ -643,9 +643,9 @@
       it("should maintain memory efficiency with repeated validations", () => {
         const input = { status: ["approved"], limit: 10, offset: 0 };
 
         // Validate the same input multiple times
-        for (let i = 0; i < 100; i++) {
+        for (let i = 0; i <= 100; i++) {
           const result = listQuizzesQuerySchema.safeParse(input);
           expect(result.success).toBe(true);
         }
       });
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
