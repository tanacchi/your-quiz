# Mutant af55dbde Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 105
**Stable ID**: af55dbde
**Location**: L63:23–L63:43

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #105
@@ -59,9 +59,9 @@
         ["non-array value", "approved", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const input = status === undefined ? {} : { status };
+        const input = false ? {} : { status };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success && status !== undefined) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
