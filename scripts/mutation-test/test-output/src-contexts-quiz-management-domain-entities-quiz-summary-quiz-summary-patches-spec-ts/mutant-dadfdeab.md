# Mutant dadfdeab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4060
**Stable ID**: dadfdeab
**Location**: L34:46–L75:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4060
@@ -30,51 +30,10 @@
     createdAt: "2023-12-01T10:00:00.000Z",
   };
 
   describe("Individual Patch Suggesters", () => {
-    describe("suggestQuestionPatches", () => {
-      it.each([
-        [
-          "untrimmed question",
-          "  Valid question  ",
-          [{ question: "Valid question" }],
-        ],
-        ["question with only spaces", "   ", [{ question: "Sample question" }]],
-        ["empty string", "", [{ question: "Sample question" }]],
-        ["valid question", "Valid question", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-        ["undefined input", undefined, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestQuestionPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestQuestionPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
-          const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
-          const patches = suggestQuestionPatches(input.question);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.question).toBe("Untrimmed");
-        });
-
-        it("should apply sample question patch correctly", () => {
-          const input = { ...validQuizSummaryInput, question: "" };
-          const patches = suggestQuestionPatches(input.question);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.question).toBe("Sample question");
-        });
-      });
-    });
-
     describe("suggestExplanationPatches", () => {
       it.each([
         [
           "untrimmed explanation",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
