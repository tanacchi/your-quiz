# Mutant 035acc0c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2021
**Stable ID**: 035acc0c
**Location**: L265:49–L265:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2021
@@ -261,9 +261,9 @@
       it("should handle invalid solution object", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
-        const invalidSolution = { invalidField: "test" };
+        const invalidSolution = { invalidField: "" };
         const result = suggestSolutionPatches(invalidSolution);
 
         expect(result).toEqual([
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
