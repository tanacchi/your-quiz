# Mutant 313ca7f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4155
**Stable ID**: 313ca7f1
**Location**: L111:45–L146:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4155
@@ -107,45 +107,10 @@
         });
       });
     });
 
-    describe("suggestIdFieldPatches", () => {
-      it.each([
-        ["id field", "id"],
-        ["solutionId field", "solutionId"],
-        ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
-        const suggester = suggestIdFieldPatches(
-          fieldName as keyof QuizSummaryInput,
-        );
+    describe("suggestIdFieldPatches", () => {});
 
-        const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
-          ["valid id", "valid-id", []],
-          ["empty string", "", []],
-          ["non-string input", 123, []],
-        ];
-
-        testCases.forEach(([_testDesc, input, expected]) => {
-          const result = suggester(input);
-          expect(result).toEqual(expected);
-        });
-      });
-
-      describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
-          const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
-          const patches = suggestIdFieldPatches("id")(input.id);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.id).toBe("quiz-123");
-        });
-      });
-    });
-
     describe("suggestAnswerTypePatches", () => {
       it.each([
         ["single typo", "single", [{ answerType: "single_choice" }]],
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
