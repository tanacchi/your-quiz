# Mutant 32061b2b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 332
**Stable ID**: 32061b2b
**Location**: L175:10–L175:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #332
@@ -171,9 +171,9 @@
         ["decimal number", 5.5, false],
         ["string number", "0", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
-      ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
+      ])("", (_desc, offset, isValid) => {
         const input = offset === undefined ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
