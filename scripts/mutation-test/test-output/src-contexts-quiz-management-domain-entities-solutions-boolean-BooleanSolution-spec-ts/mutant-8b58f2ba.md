# Mutant 8b58f2ba Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5552
**Stable ID**: 8b58f2ba
**Location**: L141:28–L145:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5552
@@ -137,13 +137,9 @@
       it("should negate true to false", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated.get("value")).toBe(false);
-          expect(negated.isFalse()).toBe(true);
-        }
+        if (result.isOk()) {}
       });
 
       it("should negate false to true", () => {
         const result = falseSolution.negate();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
