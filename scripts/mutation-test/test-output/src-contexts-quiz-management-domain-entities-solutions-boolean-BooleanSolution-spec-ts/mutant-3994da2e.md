# Mutant 3994da2e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5534
**Stable ID**: 3994da2e
**Location**: L121:10–L121:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5534
@@ -117,9 +117,9 @@
       it("should return true for true value", () => {
         expect(trueSolution.isTrue()).toBe(true);
       });
 
-      it("should return false for false value", () => {
+      it("", () => {
         expect(falseSolution.isTrue()).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
