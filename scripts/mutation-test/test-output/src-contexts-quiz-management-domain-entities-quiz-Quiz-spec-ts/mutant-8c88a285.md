# Mutant 8c88a285 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 990
**Stable ID**: 8c88a285
**Location**: L112:11–L112:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #990
@@ -108,9 +108,9 @@
 
       const result = Quiz.from(noSolutionData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const hasSolutionIssue = result.error.issues.some(
           (issue) => issue.path[0] === "solution",
         );
         expect(hasSolutionIssue).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
