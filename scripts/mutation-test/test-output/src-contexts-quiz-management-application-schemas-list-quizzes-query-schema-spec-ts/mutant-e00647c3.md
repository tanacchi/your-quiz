# Mutant e00647c3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 251
**Stable ID**: e00647c3
**Location**: L131:10–L131:26

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #251
@@ -127,9 +127,9 @@
     describe("Limit Field Validation", () => {
       it.each([
         ["minimum valid limit", 1, true],
         ["default limit", 10, true],
-        ["moderate limit", 50, true],
+        ["", 50, true],
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
