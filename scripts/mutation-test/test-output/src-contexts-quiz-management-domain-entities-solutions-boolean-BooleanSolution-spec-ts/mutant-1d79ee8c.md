# Mutant 1d79ee8c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5569
**Stable ID**: 1d79ee8c
**Location**: L163:13–L163:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5569
@@ -159,9 +159,9 @@
       it("should return new instance (immutability)", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
+        if (false) {
           const negated = result.value;
           expect(negated).not.toBe(trueSolution);
           expect(trueSolution.get("value")).toBe(true); // original unchanged
           expect(negated.get("value")).toBe(false); // new instance changed
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
