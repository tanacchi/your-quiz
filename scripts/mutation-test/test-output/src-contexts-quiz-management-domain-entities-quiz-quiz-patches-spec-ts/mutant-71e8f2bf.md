# Mutant 71e8f2bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2281
**Stable ID**: 71e8f2bf
**Location**: L560:65–L587:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2281
@@ -556,37 +556,10 @@
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
       });
 
-      it("should include consistency patches at the end", () => {
-        const input = {
-          answerType: "single_choice",
-          solution: { id: "solution-123", value: true },
-        };
+      it("should include consistency patches at the end", () => {});
 
-        const issues: Issue[] = [
-          {
-            path: ["answerType"],
-            code: "invalid",
-            message: "Invalid answerType",
-          },
-        ];
-
-        const result = suggestQuizPatches(input, issues);
-
-        // Should have at least one patch
-        expect(result.length).toBeGreaterThanOrEqual(1);
-
-        // Last patch should be from consistency checker
-        const hasConsistencyPatch = result.some(
-          (patch) =>
-            typeof patch === "object" &&
-            "answerType" in patch &&
-            patch.answerType === "boolean",
-        );
-        expect(hasConsistencyPatch).toBe(true);
-      });
-
       describe("Integration with applyEntityPatches", () => {
         it("should apply multiple patches correctly", () => {
           const input = {
             id: "  quiz-123  " as QuizId,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
