# Mutant ef6b322e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5550
**Stable ID**: ef6b322e
**Location**: L141:13–L141:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5550
@@ -137,9 +137,9 @@
       it("should negate true to false", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
+        if (true) {
           const negated = result.value;
           expect(negated.get("value")).toBe(false);
           expect(negated.isFalse()).toBe(true);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
