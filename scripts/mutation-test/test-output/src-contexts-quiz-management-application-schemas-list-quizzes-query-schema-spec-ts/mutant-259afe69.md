# Mutant 259afe69 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 279
**Stable ID**: 259afe69
**Location**: L140:10–L140:43

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #279
@@ -136,9 +136,9 @@
         ["decimal number", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
-      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
+      ])("", (_desc, limit, isValid) => {
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
