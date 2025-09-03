# Mutant 55c1e805 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 991
**Stable ID**: 55c1e805
**Location**: L112:11–L112:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #991
@@ -108,9 +108,9 @@
 
       const result = Quiz.from(noSolutionData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const hasSolutionIssue = result.error.issues.some(
           (issue) => issue.path[0] === "solution",
         );
         expect(hasSolutionIssue).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
