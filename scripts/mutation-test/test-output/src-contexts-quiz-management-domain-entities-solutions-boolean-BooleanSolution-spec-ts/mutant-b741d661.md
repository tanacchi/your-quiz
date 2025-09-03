# Mutant b741d661 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5611
**Stable ID**: b741d661
**Location**: L228:11–L228:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5611
@@ -224,9 +224,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isOk()).toBe(true);
 
-      if (entityResult.isOk()) {
+      if (false) {
         const solution = entityResult.value;
         expect(solution.get("value")).toBe(false);
         expect(solution.get("id")).toBe("solution-draft");
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
