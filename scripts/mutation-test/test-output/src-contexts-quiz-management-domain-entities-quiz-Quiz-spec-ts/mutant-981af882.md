# Mutant 981af882 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1252
**Stable ID**: 981af882
**Location**: L442:31–L447:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1252
@@ -438,14 +438,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
-            const solutionIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "solution",
-            );
-            expect(solutionIssue).toBeDefined();
-          }
+          if (result.isErr()) {}
         });
 
         it("should handle cross-field validation errors", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
