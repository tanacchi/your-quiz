# Mutant 9bff8da0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1168
**Stable ID**: 9bff8da0
**Location**: L342:64–L369:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1168
@@ -338,37 +338,10 @@
             expect(quiz.get("status")).toBe("pending_approval");
           }
         });
 
-        it("should work with incrementally built draft", () => {
-          const draft = new Quiz.Draft();
+        it("should work with incrementally built draft", () => {});
 
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
         it("should create quiz with business logic methods working", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-business",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
