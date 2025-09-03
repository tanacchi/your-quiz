# Mutant 47b6ac69 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7707
**Stable ID**: 47b6ac69
**Location**: L381:34–L381:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7707
@@ -377,9 +377,9 @@
 
     describe("String Validation Guards", () => {
       test("should validate answer types", () => {
         expect(isValidAnswerType("boolean")).toBe(true);
-        expect(isValidAnswerType("invalid")).toBe(false);
+        expect(isValidAnswerType("")).toBe(false);
       });
 
       test("should validate quiz statuses", () => {
         expect(isValidQuizStatus("approved")).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
