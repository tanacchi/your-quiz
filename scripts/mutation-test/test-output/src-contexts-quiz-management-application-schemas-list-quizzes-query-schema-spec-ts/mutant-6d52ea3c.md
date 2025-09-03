# Mutant 6d52ea3c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 316
**Stable ID**: 6d52ea3c
**Location**: L170:10–L170:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #316
@@ -166,9 +166,9 @@
         ["zero offset", 0, true],
         ["small offset", 10, true],
         ["large offset", 1000, true],
         ["very large offset", 999999, true],
-        ["negative offset", -1, false],
+        ["", -1, false],
         ["decimal number", 5.5, false],
         ["string number", "0", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
