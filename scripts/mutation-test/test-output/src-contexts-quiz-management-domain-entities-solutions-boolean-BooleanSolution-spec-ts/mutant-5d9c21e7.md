# Mutant 5d9c21e7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5551
**Stable ID**: 5d9c21e7
**Location**: L141:13–L141:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5551
@@ -137,9 +137,9 @@
       it("should negate true to false", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
+        if (false) {
           const negated = result.value;
           expect(negated.get("value")).toBe(false);
           expect(negated.isFalse()).toBe(true);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
