# Mutant 7b6b3e92 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 161
**Stable ID**: 7b6b3e92
**Location**: L93:23–L93:46

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #161
@@ -89,9 +89,9 @@
         ["array value (should reject)", ["creator-123"], false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
-        const input = creatorId === undefined ? {} : { creatorId };
+        const input = false ? {} : { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success && creatorId !== undefined) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
