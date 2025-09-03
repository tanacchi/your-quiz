# Mutant ee47d89d Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 267
**Stable ID**: ee47d89d
**Location**: L136:10–L136:26

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #267
@@ -132,9 +132,9 @@
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
         ["negative limit", -1, false],
         ["over maximum limit", 101, false],
-        ["decimal number", 10.5, false],
+        ["", 10.5, false],
         ["string number", "10", false],
         ["null value", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
