# Mutant c9dd93a3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5547
**Stable ID**: c9dd93a3
**Location**: L137:10–L137:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5547
@@ -133,9 +133,9 @@
       });
     });
 
     describe("negate() method", () => {
-      it("should negate true to false", () => {
+      it("", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
         if (result.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
