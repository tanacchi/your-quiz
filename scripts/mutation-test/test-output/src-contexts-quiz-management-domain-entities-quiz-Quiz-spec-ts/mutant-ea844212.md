# Mutant ea844212 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1221
**Stable ID**: ea844212
**Location**: L404:40–L473:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1221
@@ -400,79 +400,10 @@
           }
         });
       });
 
-      describe("Error Handling", () => {
-        it("should handle invalid draft data", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-invalid",
-            question: "", // Invalid empty question
-            answerType: "boolean",
-            solution: { id: "sol-invalid", value: true },
-            status: "pending_approval",
-            creatorId: "creator-invalid",
-            createdAt: "2023-12-01 10:00:00",
-          });
+      describe("Error Handling", () => {});
 
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            expect(result.error.issues).toHaveLength(1);
-            expect(result.error.issues[0]?.path[0]).toBe("question");
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
-        });
-
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
-
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
-        it("should handle cross-field validation errors", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-cross-validation",
-            question: "Valid question?",
-            answerType: "boolean",
-            solution: { id: "sol-cross", value: true },
-            status: "approved", // Invalid without approvedAt
-            creatorId: "creator-cross",
-            createdAt: "2023-12-01 10:00:00",
-            // Missing approvedAt for approved status
-          });
-
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            const approvedAtIssue = result.error.issues.find(
-              (issue) => issue.path[0] === "approvedAt",
-            );
-            expect(approvedAtIssue).toBeDefined();
-          }
-        });
-      });
-
       describe("Patch System Integration", () => {
         it("should work with patch application using applyPatches", () => {
           const draft = new Quiz.Draft();
           draft.with({
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
