# Mutant 5ce54d37 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 615
**Stable ID**: 5ce54d37
**Location**: L439:9–L439:32

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #615
@@ -435,9 +435,9 @@
     describe("Special Characters and Unicode", () => {
       it.each([
         ["special characters", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
-        ["emoji", "creator-🚀"],
+        [],
         ["mixed unicode", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
