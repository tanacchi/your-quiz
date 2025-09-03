# Mutant 10b6baf0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 619
**Stable ID**: 10b6baf0
**Location**: L440:10–L440:25

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #619
@@ -436,9 +436,9 @@
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
-        ["mixed unicode", "creator-テスト123"],
+        ["", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
