# Mutant 0a1024b9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5501
**Stable ID**: 0a1024b9
**Location**: L64:11–L64:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5501
@@ -60,9 +60,9 @@
 
       const result = BooleanSolution.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const { issues } = result.error;
         expect(issues).toHaveLength(1);
         expect(issues[0]?.path).toEqual(["value"]);
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
