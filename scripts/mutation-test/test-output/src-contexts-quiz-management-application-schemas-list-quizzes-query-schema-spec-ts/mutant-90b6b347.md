# Mutant 90b6b347 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 307
**Stable ID**: 90b6b347
**Location**: L167:10–L167:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #307
@@ -163,9 +163,9 @@
 
     describe("Offset Field Validation", () => {
       it.each([
         ["zero offset", 0, true],
-        ["small offset", 10, true],
+        ["", 10, true],
         ["large offset", 1000, true],
         ["very large offset", 999999, true],
         ["negative offset", -1, false],
         ["decimal number", 5.5, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
