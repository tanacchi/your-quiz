# Mutant 73e826a1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 544
**Stable ID**: 73e826a1
**Location**: L370:10–L370:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #544
@@ -366,9 +366,9 @@
         ["minimum boundary - 1", 1, true],
         ["just below minimum", 0, false],
         ["maximum boundary - 100", 100, true],
         ["just above maximum", 101, false],
-        ["large number", 1000, false],
+        ["", 1000, false],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
       ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
         const input = { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
