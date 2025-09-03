# Mutant c61d7f72 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5537
**Stable ID**: c61d7f72
**Location**: L126:14–L126:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5537
@@ -122,9 +122,9 @@
         expect(falseSolution.isTrue()).toBe(false);
       });
     });
 
-    describe("isFalse() method", () => {
+    describe("", () => {
       it("should return false for true value", () => {
         expect(trueSolution.isFalse()).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
