# Mutant 5e96b9e9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 264
**Stable ID**: 5e96b9e9
**Location**: L135:10–L135:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #264
@@ -131,9 +131,9 @@
         ["moderate limit", 50, true],
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
         ["negative limit", -1, false],
-        ["over maximum limit", 101, false],
+        ["", 101, false],
         ["decimal number", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
