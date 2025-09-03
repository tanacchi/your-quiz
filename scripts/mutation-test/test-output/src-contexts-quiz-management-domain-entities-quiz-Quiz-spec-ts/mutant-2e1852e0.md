# Mutant 2e1852e0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1389
**Stable ID**: 2e1852e0
**Location**: L645:57–L679:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1389
@@ -641,44 +641,10 @@
     });
 
     describe("DraftBase Methods", () => {
       describe("applyPatches method", () => {
-        it("should apply single patch correctly", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-single-patch",
-            question: "   ", // Whitespace only - will need patch
-            answerType: "boolean",
-            solution: { id: "sol-single", value: true },
-            status: "pending_approval",
-            creatorId: "creator-single",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should apply single patch correctly", () => {});
 
-          expect(draft.hasErrors()).toBe(true);
-
-          const patches = draft.getPatches();
-          const questionPatch = patches.find(
-            (patch) =>
-              typeof patch === "object" &&
-              patch !== null &&
-              "question" in patch,
-          );
-          expect(questionPatch).toBeDefined();
-
-          if (questionPatch) {
-            draft.applyPatches([questionPatch]);
-
-            // After applying the question patch, question should be fixed
-            const updatedQuestion = draft.get("question");
-            expect(updatedQuestion).not.toBe("   ");
-            expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
-              expect(updatedQuestion.trim().length).toBeGreaterThan(0);
-            }
-          }
-        });
-
         it("should apply multiple patches correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-multi-patch",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
