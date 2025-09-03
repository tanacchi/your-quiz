# Mutant 6b0d40ac Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 274
**Stable ID**: 6b0d40ac
**Location**: L138:10–L138:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #274
@@ -134,9 +134,9 @@
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
         ["string number", "10", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
