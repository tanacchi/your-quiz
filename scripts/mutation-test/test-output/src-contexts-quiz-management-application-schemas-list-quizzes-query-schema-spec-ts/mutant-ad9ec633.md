# Mutant ad9ec633 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 245
**Stable ID**: ad9ec633
**Location**: L129:10–L129:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #245
@@ -125,9 +125,9 @@
     });
 
     describe("Limit Field Validation", () => {
       it.each([
-        ["minimum valid limit", 1, true],
+        ["", 1, true],
         ["default limit", 10, true],
         ["moderate limit", 50, true],
         ["maximum valid limit", 100, true],
         ["zero limit", 0, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
