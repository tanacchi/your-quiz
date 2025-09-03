# Mutant 7c77b217 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4168
**Stable ID**: 7c77b217
**Location**: L121:27–L126:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4168
@@ -117,14 +117,9 @@
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
         );
 
-        const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
-          ["valid id", "valid-id", []],
-          ["empty string", "", []],
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
