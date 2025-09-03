# Mutant 5cd5b3e9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 613
**Stable ID**: 5cd5b3e9
**Location**: L438:10–L438:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #613
@@ -434,9 +434,9 @@
 
     describe("Special Characters and Unicode", () => {
       it.each([
         ["special characters", "creator-!@#$%"],
-        ["unicode characters", "creator-プログラミング"],
+        ["", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
       ])("should handle %s in creatorId", (_desc, creatorId) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
