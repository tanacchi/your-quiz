# Mutant 4e88bc3f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7570
**Stable ID**: 4e88bc3f
**Location**: L196:12–L196:58

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7570
@@ -192,9 +192,9 @@
 
         expectValidParse(zodQuizRowSchema, rowWithOptionals);
       });
 
-      test("should handle null/undefined optional fields", () => {
+      test("", () => {
         const baseRow = createValidQuizRow();
         const rowWithNulls = {
           ...baseRow,
           explanation: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
