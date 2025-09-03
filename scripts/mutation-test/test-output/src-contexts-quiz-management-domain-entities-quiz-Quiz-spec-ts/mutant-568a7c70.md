# Mutant 568a7c70 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1254
**Stable ID**: 568a7c70
**Location**: L444:26–L444:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1254
@@ -440,9 +440,9 @@
           expect(result.isErr()).toBe(true);
 
           if (result.isErr()) {
             const solutionIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "solution",
+              (issue) => true,
             );
             expect(solutionIssue).toBeDefined();
           }
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
