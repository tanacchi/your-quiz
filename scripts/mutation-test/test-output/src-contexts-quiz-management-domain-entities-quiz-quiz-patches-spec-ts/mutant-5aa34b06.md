# Mutant 5aa34b06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1656
**Stable ID**: 5aa34b06
**Location**: L36:46–L90:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1656
@@ -32,64 +32,10 @@
     createdAt: "2023-12-01T10:00:00.000Z",
   };
 
   describe("Individual Patch Suggesters", () => {
-    describe("suggestQuestionPatches", () => {
-      it.each([
-        [
-          "untrimmed question",
-          "  Valid question?  ",
-          [{ question: "Valid question?" }],
-        ],
-        ["empty string", "", [{ question: "Sample boolean question?" }]],
-        ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
-        ["exactly 500 chars", "A".repeat(500), []],
-        ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
-        ["valid question", "Valid question?", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestQuestionPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestQuestionPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
-          const input = {
-            ...validQuizInput,
-            question: "  Untrimmed question?  ",
-          };
-          const patches = suggestQuestionPatches(input.question);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.question).toBe("Untrimmed question?");
-        });
-
-        it("should apply sample question patch correctly", () => {
-          const input = { ...validQuizInput, question: "" };
-          const patches = suggestQuestionPatches(input.question);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.question).toBe("Sample boolean question?");
-        });
-
-        it("should apply truncation patch correctly", () => {
-          const longQuestion = "A".repeat(501);
-          const input = { ...validQuizInput, question: longQuestion };
-          const patches = suggestQuestionPatches(input.question);
-          expect(patches.length).toBeGreaterThanOrEqual(1);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
-
-          expect(patched.question).toBe(`${"A".repeat(497)}...`);
-          expect(patched.question?.length).toBe(500);
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
