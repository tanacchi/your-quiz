# Mutant 1bcea44a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1137
**Stable ID**: 1bcea44a
**Location**: L306:47–L402:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1137
@@ -302,106 +302,10 @@
       expect(patches.length).toBeGreaterThan(0);
     });
 
     describe("Quiz.fromDraft Method", () => {
-      describe("Successful Conversion", () => {
-        it("should create Quiz entity from valid draft", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-from-draft",
-            question: "Is Rust a systems programming language?",
-            answerType: "boolean",
-            solution: {
-              id: "solution-rust",
-              value: true,
-            },
-            explanation:
-              "Rust is designed for systems programming with memory safety",
-            status: "pending_approval",
-            creatorId: "creator-rust",
-            createdAt: "2023-12-01 10:00:00",
-          });
+      describe("Successful Conversion", () => {});
 
-          const result = Quiz.fromDraft(draft);
-          expect(result.isOk()).toBe(true);
-
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.get("id")).toBe("quiz-from-draft");
-            expect(quiz.get("question")).toBe(
-              "Is Rust a systems programming language?",
-            );
-            expect(quiz.get("answerType")).toBe("boolean");
-            expect(quiz.getSolution().get("value")).toBe(true);
-            expect(quiz.get("explanation")).toBe(
-              "Rust is designed for systems programming with memory safety",
-            );
-            expect(quiz.get("status")).toBe("pending_approval");
-          }
-        });
-
-        it("should work with incrementally built draft", () => {
-          const draft = new Quiz.Draft();
-
-          // Build draft step by step
-          draft.update("id", "quiz-incremental");
-          draft.update("question", "Can TypeScript catch runtime errors?");
-          draft.update("answerType", "boolean");
-          draft.update("solution", {
-            id: "solution-ts",
-            value: false,
-          });
-          draft.update("status", "pending_approval");
-          draft.update("creatorId", "creator-ts");
-          draft.update("createdAt", "2023-12-01 10:00:00");
-
-          expect(draft.hasErrors()).toBe(false);
-
-          const result = Quiz.fromDraft(draft);
-          expect(result.isOk()).toBe(true);
-
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.get("question")).toBe(
-              "Can TypeScript catch runtime errors?",
-            );
-            expect(quiz.getSolution().get("value")).toBe(false);
-          }
-        });
-
-        it("should create quiz with business logic methods working", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-business",
-            question: "Is this quiz ready for approval?",
-            answerType: "boolean",
-            solution: { id: "sol-business", value: true },
-            status: "pending_approval",
-            creatorId: "creator-business",
-            createdAt: "2023-12-01 10:00:00",
-          });
-
-          const result = Quiz.fromDraft(draft);
-          expect(result.isOk()).toBe(true);
-
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.canBeUpdated()).toBe(true);
-            expect(quiz.canBeDeleted()).toBe(true);
-
-            // Test approval workflow
-            const approvedResult = quiz.approve("2023-12-02 10:00:00");
-            expect(approvedResult.isOk()).toBe(true);
-
-            if (approvedResult.isOk()) {
-              const approvedQuiz = approvedResult.value;
-              expect(approvedQuiz.get("status")).toBe("approved");
-              expect(approvedQuiz.canBeUpdated()).toBe(false);
-            }
-          }
-        });
-      });
-
       describe("Error Handling", () => {
         it("should handle invalid draft data", () => {
           const draft = new Quiz.Draft();
           draft.with({
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
