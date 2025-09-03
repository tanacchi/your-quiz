# Mutant 300cd6ce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1250
**Stable ID**: 300cd6ce
**Location**: L442:15–L442:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1250
@@ -438,9 +438,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
+          if (true) {
             const solutionIssue = result.error.issues.find(
               (issue) => issue.path[0] === "solution",
             );
             expect(solutionIssue).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
