# Mutant a1916d46 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 257
**Stable ID**: a1916d46
**Location**: L133:10–L133:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #257
@@ -129,9 +129,9 @@
         ["minimum valid limit", 1, true],
         ["default limit", 10, true],
         ["moderate limit", 50, true],
         ["maximum valid limit", 100, true],
-        ["zero limit", 0, false],
+        ["", 0, false],
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
         ["string number", "10", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
