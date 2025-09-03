# Mutant b20999e0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4480
**Stable ID**: b20999e0
**Location**: L389:84–L461:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4480
@@ -385,82 +385,10 @@
         expect(result).toContainEqual({ question: "Valid question" });
         expect(result).toContainEqual({ answerType: "single_choice" });
       });
 
-      it("should suggest patches for all relevant fields when issues exist", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "",
-          explanation: "  explanation  ",
-          solutionId: "  solution-456  ",
-          creatorId: "  creator-789  ",
-          answerType: "bool",
-          status: "pending",
-          tagIds: ["valid", "", " trimmed "],
-          approvedAt: undefined,
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
-            path: ["solutionId"],
-            code: "invalid",
-            message: "Invalid solutionId",
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
-          { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
-          {
-            path: ["approvedAt"],
-            code: "invalid",
-            message: "Invalid approvedAt",
-          },
-        ];
-
-        const result = suggestQuizSummaryPatches(input, issues);
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
-            patch.question === "Sample question",
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
       describe("Integration with applyEntityPatches", () => {
         it("should apply multiple patches correctly", () => {
           const input = {
             id: "  quiz-123  ",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
