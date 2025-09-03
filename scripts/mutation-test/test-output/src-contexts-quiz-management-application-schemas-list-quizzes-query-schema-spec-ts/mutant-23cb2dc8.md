# Mutant 23cb2dc8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 225
**Stable ID**: 23cb2dc8
**Location**: L115:10–L115:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #225
@@ -111,9 +111,9 @@
         ["mixed valid and empty", ["quiz-1", ""], false],
         ["empty array", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
-        ["undefined value", undefined, true],
+        ["", undefined, true],
       ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
         const input = quizId === undefined ? {} : { quizId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
