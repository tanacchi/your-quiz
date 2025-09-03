# Mutant c53bd062 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 310
**Stable ID**: c53bd062
**Location**: L168:10–L168:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #310
@@ -164,9 +164,9 @@
     describe("Offset Field Validation", () => {
       it.each([
         ["zero offset", 0, true],
         ["small offset", 10, true],
-        ["large offset", 1000, true],
+        ["", 1000, true],
         ["very large offset", 999999, true],
         ["negative offset", -1, false],
         ["decimal number", 5.5, false],
         ["string number", "0", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
