# Mutant 38dcd4a4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2143
**Stable ID**: 38dcd4a4
**Location**: L458:78–L496:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2143
@@ -454,48 +454,10 @@
           expect(result).toEqual([]);
         });
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
-        const input = {
-          id: "  quiz-123  ",
-          question: "  Valid question?  ",
-          answerType: "bool",
-          status: "pending",
-          solution: null,
-        };
+      it("should only suggest patches for fields mentioned in issues", () => {});
 
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid question" },
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-        ];
-
-        const result = suggestQuizPatches(input, issues);
-
-        // Should suggest patches for question, answerType, and consistency patches
-        expect(result.length).toBeGreaterThanOrEqual(2);
-
-        const hasQuestionPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "question" in patch &&
-            patch.question === "Valid question?",
-        );
-        const hasAnswerTypePatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
-        );
-
-        expect(hasQuestionPatch).toBe(true);
-        expect(hasAnswerTypePatch).toBe(true);
-      });
-
       it("should suggest patches for all relevant fields when issues exist", () => {
         const input = {
           id: "  quiz-123  ",
           question: "",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
