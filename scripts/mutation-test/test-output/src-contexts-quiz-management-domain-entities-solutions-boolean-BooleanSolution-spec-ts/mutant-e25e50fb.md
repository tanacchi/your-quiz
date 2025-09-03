# Mutant e25e50fb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5556
**Stable ID**: e25e50fb
**Location**: L148:10–L148:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5556
@@ -144,9 +144,9 @@
           expect(negated.isFalse()).toBe(true);
         }
       });
 
-      it("should negate false to true", () => {
+      it("", () => {
         const result = falseSolution.negate();
         expect(result.isOk()).toBe(true);
 
         if (result.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
