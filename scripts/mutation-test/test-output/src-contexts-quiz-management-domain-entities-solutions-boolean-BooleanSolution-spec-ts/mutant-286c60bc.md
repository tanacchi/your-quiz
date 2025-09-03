# Mutant 286c60bc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5512
**Stable ID**: 286c60bc
**Location**: L80:11–L80:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5512
@@ -76,9 +76,9 @@
 
       const result = BooleanSolution.from(incompleteData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const { issues } = result.error;
         expect(issues.length).toBeGreaterThan(0);
         const valueError = issues.find((issue) => issue.path.includes("value"));
         expect(valueError).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
