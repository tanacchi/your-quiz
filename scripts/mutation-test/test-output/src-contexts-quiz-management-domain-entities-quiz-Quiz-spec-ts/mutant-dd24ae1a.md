# Mutant dd24ae1a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 995
**Stable ID**: dd24ae1a
**Location**: L114:22–L114:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #995
@@ -110,9 +110,9 @@
       expect(result.isErr()).toBe(true);
 
       if (result.isErr()) {
         const hasSolutionIssue = result.error.issues.some(
-          (issue) => issue.path[0] === "solution",
+          (issue) => true,
         );
         expect(hasSolutionIssue).toBe(true);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
