# Mutant e27c49bc Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 248
**Stable ID**: e27c49bc
**Location**: L130:10–L130:25

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #248
@@ -126,9 +126,9 @@
 
     describe("Limit Field Validation", () => {
       it.each([
         ["minimum valid limit", 1, true],
-        ["default limit", 10, true],
+        ["", 10, true],
         ["moderate limit", 50, true],
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
         ["negative limit", -1, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
