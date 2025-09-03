# Mutant 7c4af39b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 618
**Stable ID**: 7c4af39b
**Location**: L440:9–L440:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #618
@@ -436,9 +436,9 @@
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
-        ["mixed unicode", "creator-テスト123"],
+        [],
         ["URL encoded characters", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
