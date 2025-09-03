# Mutant 978c4d64 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5539
**Stable ID**: 978c4d64
**Location**: L127:10–L127:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5539
@@ -123,9 +123,9 @@
       });
     });
 
     describe("isFalse() method", () => {
-      it("should return false for true value", () => {
+      it("", () => {
         expect(trueSolution.isFalse()).toBe(false);
       });
 
       it("should return true for false value", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
