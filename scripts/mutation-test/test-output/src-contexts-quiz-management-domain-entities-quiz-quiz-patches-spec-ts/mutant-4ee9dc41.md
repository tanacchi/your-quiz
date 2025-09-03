# Mutant 4ee9dc41 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1781
**Stable ID**: 4ee9dc41
**Location**: L133:27–L138:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1781
@@ -129,14 +129,9 @@
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
-        const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
-          ["empty after trim", "   ", []],
-          ["valid id", "valid-id", []],
-          ["non-string input", 123, []],
-        ];
+        const testCases = [];
 
         testCases.forEach(([_testDesc, input, expected]) => {
           const result = suggester(input);
           expect(result).toEqual(expected);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
