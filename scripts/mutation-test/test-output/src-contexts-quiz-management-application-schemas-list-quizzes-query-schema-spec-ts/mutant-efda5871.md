# Mutant efda5871 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 563
**Stable ID**: efda5871
**Location**: L383:10–L383:26

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #563
@@ -379,9 +379,9 @@
     describe("Offset Boundary Testing", () => {
       it.each([
         ["minimum boundary - 0", 0, true],
         ["just below minimum", -1, false],
-        ["small positive", 1, true],
+        ["", 1, true],
         ["large positive", 999999, true],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
       ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
         const input = { offset };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
