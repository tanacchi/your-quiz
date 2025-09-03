# Mutant 7e5138b0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1139
**Stable ID**: 7e5138b0
**Location**: L307:64–L340:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1139
@@ -303,43 +303,10 @@
     });
 
     describe("Quiz.fromDraft Method", () => {
       describe("Successful Conversion", () => {
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
+        it("should create Quiz entity from valid draft", () => {});
 
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
         it("should work with incrementally built draft", () => {
           const draft = new Quiz.Draft();
 
           // Build draft step by step
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
