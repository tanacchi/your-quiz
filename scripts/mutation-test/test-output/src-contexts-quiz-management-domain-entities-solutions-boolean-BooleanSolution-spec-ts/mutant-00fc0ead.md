# Mutant 00fc0ead Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5622
**Stable ID**: 00fc0ead
**Location**: L246:11–L246:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5622
@@ -242,9 +242,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
 
-      if (entityResult.isErr()) {
+      if (true) {
         const { issues } = entityResult.error;
         expect(issues.length).toBeGreaterThan(0);
         const valueError = issues.find((issue) => issue.path.includes("value"));
         expect(valueError).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
