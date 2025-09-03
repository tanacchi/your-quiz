# Mutant be00c8e7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2191
**Stable ID**: be00c8e7
**Location**: L498:84–L558:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2191
@@ -494,70 +494,10 @@
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
       });
 
-      it("should suggest patches for all relevant fields when issues exist", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "",
-          explanation: "A".repeat(1001),
-          creatorId: "  creator-789  ",
-          answerType: "bool",
-          status: "pending",
-          solution: null,
-        };
+      it("should suggest patches for all relevant fields when issues exist", () => {});
 
-        const issues: Issue[] = [
-          { path: ["id"], code: "invalid", message: "Invalid id" },
-          { path: ["question"], code: "invalid", message: "Invalid question" },
-          {
-            path: ["explanation"],
-            code: "invalid",
-            message: "Invalid explanation",
-          },
-          {
-            path: ["creatorId"],
-            code: "invalid",
-            message: "Invalid creatorId",
-          },
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-          { path: ["status"], code: "invalid", message: "Invalid status" },
-          { path: ["solution"], code: "invalid", message: "Invalid solution" },
-        ];
-
-        const result = suggestQuizPatches(input, issues);
-
-        expect(result.length).toBeGreaterThan(0);
-
-        // Check for specific patches
-        const hasIdPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "id" in patch &&
-            patch.id === "quiz-123",
-        );
-        const hasQuestionPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
-            patch.question === "Sample boolean question?",
-        );
-        const hasAnswerTypePatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
-        );
-
-        expect(hasIdPatch).toBe(true);
-        expect(hasQuestionPatch).toBe(true);
-        expect(hasAnswerTypePatch).toBe(true);
-      });
-
       it("should include consistency patches at the end", () => {
         const input = {
           answerType: "single_choice",
           solution: { id: "solution-123", value: true },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
