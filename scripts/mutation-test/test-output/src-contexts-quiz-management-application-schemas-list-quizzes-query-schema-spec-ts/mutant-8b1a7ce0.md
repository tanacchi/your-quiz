# Mutant 8b1a7ce0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 227
**Stable ID**: 8b1a7ce0
**Location**: L116:10–L116:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #227
@@ -112,9 +112,9 @@
         ["empty array", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
-      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
+      ])("", (_desc, quizId, isValid) => {
         const input = quizId === undefined ? {} : { quizId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
