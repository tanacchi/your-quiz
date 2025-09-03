# Mutant 952462ec Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5560
**Stable ID**: 952462ec
**Location**: L152:13–L152:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5560
@@ -148,9 +148,9 @@
       it("should negate false to true", () => {
         const result = falseSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
+        if (false) {
           const negated = result.value;
           expect(negated.get("value")).toBe(true);
           expect(negated.isTrue()).toBe(true);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
