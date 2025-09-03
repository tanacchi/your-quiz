# Mutant eb8f096e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5542
**Stable ID**: eb8f096e
**Location**: L131:10–L131:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5542
@@ -127,9 +127,9 @@
       it("should return false for true value", () => {
         expect(trueSolution.isFalse()).toBe(false);
       });
 
-      it("should return true for false value", () => {
+      it("", () => {
         expect(falseSolution.isFalse()).toBe(true);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
