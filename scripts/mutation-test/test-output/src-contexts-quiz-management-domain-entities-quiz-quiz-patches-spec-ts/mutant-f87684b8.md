# Mutant f87684b8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1780
**Stable ID**: f87684b8
**Location**: L130:52–L144:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1780
@@ -126,24 +126,10 @@
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
-        const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
+      ])("should handle %s", (_desc, fieldName) => {});
 
-        const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
-          ["empty after trim", "   ", []],
-          ["valid id", "valid-id", []],
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
           const input = { ...validQuizInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
