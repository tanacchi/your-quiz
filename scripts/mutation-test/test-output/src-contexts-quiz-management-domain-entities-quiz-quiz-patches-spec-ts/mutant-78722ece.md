# Mutant 78722ece Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2020
**Stable ID**: 78722ece
**Location**: L265:33–L265:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2020
@@ -261,9 +261,9 @@
       it("should handle invalid solution object", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
-        const invalidSolution = { invalidField: "test" };
+        const invalidSolution = {};
         const result = suggestSolutionPatches(invalidSolution);
 
         expect(result).toEqual([
           {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
