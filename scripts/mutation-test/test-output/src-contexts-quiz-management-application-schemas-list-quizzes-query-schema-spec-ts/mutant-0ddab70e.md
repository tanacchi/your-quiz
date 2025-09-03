# Mutant 0ddab70e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 616
**Stable ID**: 0ddab70e
**Location**: L439:10–L439:17

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #616
@@ -435,9 +435,9 @@
     describe("Special Characters and Unicode", () => {
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
-        ["emoji", "creator-🚀"],
+        ["", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
