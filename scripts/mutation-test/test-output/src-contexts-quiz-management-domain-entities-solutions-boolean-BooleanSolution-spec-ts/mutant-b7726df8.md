# Mutant b7726df8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5479
**Stable ID**: b7726df8
**Location**: L33:11–L33:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5479
@@ -29,9 +29,9 @@
     it("should create valid boolean solution from complete data", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (false) {
         const solution = result.value;
         expect(solution.get("id")).toBe("solution-1");
         expect(solution.get("value")).toBe(true);
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
