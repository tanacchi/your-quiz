# Mutant 30c87ed4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5648
**Stable ID**: 30c87ed4
**Location**: L289:12–L289:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5648
@@ -285,9 +285,9 @@
       expect(Object.isFrozen(solution)).toBe(true);
     });
   });
 
-  describe("Factory Methods", () => {
+  describe("", () => {
     it("should create BooleanSolution from valid data", () => {
       const result = BooleanSolution.from(validSolutionData);
 
       const solution = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
