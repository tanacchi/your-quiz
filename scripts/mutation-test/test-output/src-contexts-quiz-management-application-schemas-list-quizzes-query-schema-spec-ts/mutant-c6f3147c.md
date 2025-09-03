# Mutant c6f3147c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 282
**Stable ID**: c6f3147c
**Location**: L141:23–L141:42

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #282
@@ -137,9 +137,9 @@
         ["string number", "10", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
-        const input = limit === undefined ? {} : { limit };
+        const input = false ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
