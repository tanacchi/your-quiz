# Mutant 2f189d93 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5490
**Stable ID**: 2f189d93
**Location**: L49:11–L49:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5490
@@ -45,9 +45,9 @@
 
       const result = BooleanSolution.from(falseData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (true) {
         const solution = result.value;
         expect(solution.get("value")).toBe(false);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
