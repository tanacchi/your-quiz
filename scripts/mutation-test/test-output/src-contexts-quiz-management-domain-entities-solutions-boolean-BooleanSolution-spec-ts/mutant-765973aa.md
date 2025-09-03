# Mutant 765973aa Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5545
**Stable ID**: 765973aa
**Location**: L136:14–L136:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5545
@@ -132,9 +132,9 @@
         expect(falseSolution.isFalse()).toBe(true);
       });
     });
 
-    describe("negate() method", () => {
+    describe("", () => {
       it("should negate true to false", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
