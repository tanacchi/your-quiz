# Mutant 51381faf Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 254
**Stable ID**: 51381faf
**Location**: L132:10–L132:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #254
@@ -128,9 +128,9 @@
       it.each([
         ["minimum valid limit", 1, true],
         ["default limit", 10, true],
         ["moderate limit", 50, true],
-        ["maximum valid limit", 100, true],
+        ["", 100, true],
         ["zero limit", 0, false],
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
