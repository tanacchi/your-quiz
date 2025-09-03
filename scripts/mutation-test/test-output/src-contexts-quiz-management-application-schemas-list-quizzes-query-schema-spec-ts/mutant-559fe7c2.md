# Mutant 559fe7c2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 559
**Stable ID**: 559fe7c2
**Location**: L382:10–L382:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #559
@@ -378,9 +378,9 @@
 
     describe("Offset Boundary Testing", () => {
       it.each([
         ["minimum boundary - 0", 0, true],
-        ["just below minimum", -1, false],
+        ["", -1, false],
         ["small positive", 1, true],
         ["large positive", 999999, true],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
       ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
