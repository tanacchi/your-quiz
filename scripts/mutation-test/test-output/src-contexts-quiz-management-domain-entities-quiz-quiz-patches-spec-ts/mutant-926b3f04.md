# Mutant 926b3f04 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1783
**Stable ID**: 926b3f04
**Location**: L134:12–L134:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1783
@@ -130,9 +130,9 @@
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(fieldName as keyof QuizInput);
 
         const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
+          ["", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["empty after trim", "   ", []],
           ["valid id", "valid-id", []],
           ["non-string input", 123, []],
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
