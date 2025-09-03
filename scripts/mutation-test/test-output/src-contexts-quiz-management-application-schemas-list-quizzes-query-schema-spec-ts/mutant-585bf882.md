# Mutant 585bf882 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 610
**Stable ID**: 585bf882
**Location**: L437:10–L437:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #610
@@ -433,9 +433,9 @@
     });
 
     describe("Special Characters and Unicode", () => {
       it.each([
-        ["special characters", "creator-!@#$%"],
+        ["", "creator-!@#$%"],
         ["unicode characters", "creator-プログラミング"],
         ["emoji", "creator-🚀"],
         ["mixed unicode", "creator-テスト123"],
         ["URL encoded characters", "creator-test%20user"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
