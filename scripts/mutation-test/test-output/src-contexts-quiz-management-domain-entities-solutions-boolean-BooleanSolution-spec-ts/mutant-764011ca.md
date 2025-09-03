# Mutant 764011ca Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5565
**Stable ID**: 764011ca
**Location**: L159:10–L159:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5565
@@ -155,9 +155,9 @@
           expect(negated.isTrue()).toBe(true);
         }
       });
 
-      it("should return new instance (immutability)", () => {
+      it("", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
         if (result.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
