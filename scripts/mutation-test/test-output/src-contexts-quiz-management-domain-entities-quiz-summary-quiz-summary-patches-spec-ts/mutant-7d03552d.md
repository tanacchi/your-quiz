# Mutant 7d03552d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4167
**Stable ID**: 7d03552d
**Location**: L116:52–L132:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4167
@@ -112,26 +112,10 @@
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
         ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
-        const suggester = suggestIdFieldPatches(
-          fieldName as keyof QuizSummaryInput,
-        );
+      ])("should handle %s", (_desc, fieldName) => {});
 
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
       describe("Patch Application", () => {
         it("should apply id trim patch correctly", () => {
           const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
