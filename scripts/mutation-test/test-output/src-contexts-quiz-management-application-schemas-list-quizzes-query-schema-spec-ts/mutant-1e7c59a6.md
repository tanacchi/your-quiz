# Mutant 1e7c59a6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 335
**Stable ID**: 1e7c59a6
**Location**: L176:23–L176:43

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #335
@@ -172,9 +172,9 @@
         ["string number", "0", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
-        const input = offset === undefined ? {} : { offset };
+        const input = false ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
