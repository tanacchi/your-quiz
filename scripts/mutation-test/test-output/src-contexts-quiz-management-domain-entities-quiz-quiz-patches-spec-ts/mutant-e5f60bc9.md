# Mutant e5f60bc9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1700
**Stable ID**: e5f60bc9
**Location**: L55:43–L89:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1700
@@ -51,43 +51,9 @@
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
       });
 
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
+      describe("Patch Application", () => {});
     });
 
     describe("suggestExplanationPatches", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
