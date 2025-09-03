# Mutant d459c5c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1275
**Stable ID**: d459c5c9
**Location**: L468:26–L468:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1275
@@ -464,9 +464,9 @@
           expect(result.isErr()).toBe(true);
 
           if (result.isErr()) {
             const approvedAtIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "approvedAt",
+              (issue) => true,
             );
             expect(approvedAtIssue).toBeDefined();
           }
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
