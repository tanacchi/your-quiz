# Mutant af15e80a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1241
**Stable ID**: af15e80a
**Location**: L427:59–L448:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1241
@@ -423,31 +423,10 @@
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
 
-        it("should handle missing required fields", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-missing",
-            question: "Valid question?",
-            answerType: "boolean",
-            // Missing solution
-            status: "pending_approval",
-            creatorId: "creator-missing",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should handle missing required fields", () => {});
 
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            const solutionIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "solution",
-            );
-            expect(solutionIssue).toBeDefined();
-          }
-        });
-
         it("should handle cross-field validation errors", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-cross-validation",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
