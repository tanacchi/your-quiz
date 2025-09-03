# Mutant d6d8c952 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 621
**Stable ID**: d6d8c952
**Location**: L441:9–L441:58

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #621
@@ -437,9 +437,9 @@
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
-        ["URL encoded characters", "creator-test%20user"],
+        [],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
