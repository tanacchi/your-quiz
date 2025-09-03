# Mutant 1a5a7b44 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7552
**Stable ID**: 1a5a7b44
**Location**: L165:12–L165:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7552
@@ -161,9 +161,9 @@
         const validRow = createValidQuizRow();
         expectValidParse(zodQuizRowSchema, validRow);
       });
 
-      test("should handle numeric ID conversion", () => {
+      test("", () => {
         const baseRow = createValidQuizRow();
         const rowWithNumericId = {
           ...baseRow,
           id: 123,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
