# Mutant 411dde31 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 622
**Stable ID**: 411dde31
**Location**: L441:10–L441:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #622
@@ -437,9 +437,9 @@
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
-        ["URL encoded characters", "creator-test%20user"],
+        ["", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
