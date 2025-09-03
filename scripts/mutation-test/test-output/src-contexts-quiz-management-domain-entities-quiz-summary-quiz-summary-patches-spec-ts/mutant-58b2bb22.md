# Mutant 58b2bb22 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4116
**Stable ID**: 58b2bb22
**Location**: L77:49–L109:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4116
@@ -73,42 +73,10 @@
         });
       });
     });
 
-    describe("suggestExplanationPatches", () => {
-      it.each([
-        [
-          "untrimmed explanation",
-          "  Valid explanation  ",
-          [{ explanation: "Valid explanation" }],
-        ],
-        ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-        ["undefined input", undefined, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestExplanationPatches(input);
-        expect(result).toEqual(expected);
-      });
+    describe("suggestExplanationPatches", () => {});
 
-      describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
-          const input = {
-            ...validQuizSummaryInput,
-            explanation: "  Untrimmed explanation  ",
-          };
-          const patches = suggestExplanationPatches(input.explanation);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.explanation).toBe("Untrimmed explanation");
-        });
-      });
-    });
-
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
