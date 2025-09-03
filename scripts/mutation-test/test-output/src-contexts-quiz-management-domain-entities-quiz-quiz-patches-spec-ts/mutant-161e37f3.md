# Mutant 161e37f3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2090
**Stable ID**: 161e37f3
**Location**: L373:10–L373:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2090
@@ -369,9 +369,9 @@
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([{ answerType: "boolean" }]);
       });
 
-      it("should suggest solution when answerType is boolean but no solution", () => {
+      it("", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
         const quiz = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
