# Mutant 0a954ff5 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 313
**Stable ID**: 0a954ff5
**Location**: L169:10–L169:29

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #313
@@ -165,9 +165,9 @@
       it.each([
         ["zero offset", 0, true],
         ["small offset", 10, true],
         ["large offset", 1000, true],
-        ["very large offset", 999999, true],
+        ["", 999999, true],
         ["negative offset", -1, false],
         ["decimal number", 5.5, false],
         ["string number", "0", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
