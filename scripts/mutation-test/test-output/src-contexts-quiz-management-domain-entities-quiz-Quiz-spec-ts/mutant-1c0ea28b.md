# Mutant 1c0ea28b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1195
**Stable ID**: 1c0ea28b
**Location**: L371:76–L401:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1195
@@ -367,39 +367,9 @@
             expect(quiz.getSolution().get("value")).toBe(false);
           }
         });
 
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
+        it("should create quiz with business logic methods working", () => {});
       });
 
       describe("Error Handling", () => {
         it("should handle invalid draft data", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
