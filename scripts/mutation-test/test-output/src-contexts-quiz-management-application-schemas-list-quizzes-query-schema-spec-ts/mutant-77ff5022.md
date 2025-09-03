# Mutant 77ff5022 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 547
**Stable ID**: 77ff5022
**Location**: L371:10–L371:35

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #547
@@ -367,9 +367,9 @@
         ["just below minimum", 0, false],
         ["maximum boundary - 100", 100, true],
         ["just above maximum", 101, false],
         ["large number", 1000, false],
-        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
+        ["", Number.MAX_SAFE_INTEGER, false],
       ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
         const input = { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
