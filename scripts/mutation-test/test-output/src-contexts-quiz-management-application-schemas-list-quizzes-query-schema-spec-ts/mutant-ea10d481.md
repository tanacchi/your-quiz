# Mutant ea10d481 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 277
**Stable ID**: ea10d481
**Location**: L139:10–L139:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #277
@@ -135,9 +135,9 @@
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
+        ["", undefined, true], // Should apply default
       ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
