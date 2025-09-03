# Mutant 98ab218a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 260
**Stable ID**: 98ab218a
**Location**: L134:10–L134:26

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #260
@@ -130,9 +130,9 @@
         ["default limit", 10, true],
         ["moderate limit", 50, true],
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
-        ["negative limit", -1, false],
+        ["", -1, false],
         ["over maximum limit", 101, false],
         ["decimal number", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
