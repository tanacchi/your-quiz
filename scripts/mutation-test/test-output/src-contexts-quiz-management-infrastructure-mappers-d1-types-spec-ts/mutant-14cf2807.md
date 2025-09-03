# Mutant 14cf2807 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7713
**Stable ID**: 14cf2807
**Location**: L386:34–L386:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7713
@@ -382,9 +382,9 @@
       });
 
       test("should validate quiz statuses", () => {
         expect(isValidQuizStatus("approved")).toBe(true);
-        expect(isValidQuizStatus("invalid")).toBe(false);
+        expect(isValidQuizStatus("")).toBe(false);
       });
 
       test("should validate matching strategies", () => {
         expect(isValidMatchingStrategy("exact")).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
