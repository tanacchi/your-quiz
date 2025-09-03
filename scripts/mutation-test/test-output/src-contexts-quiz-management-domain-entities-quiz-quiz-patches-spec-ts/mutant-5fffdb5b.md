# Mutant 5fffdb5b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2057
**Stable ID**: 5fffdb5b
**Location**: L325:60–L325:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2057
@@ -321,9 +321,9 @@
         expect(result).toEqual([]);
       });
 
       it("should not suggest patch for valid solution", () => {
-        const validSolution = { id: "solution-123", value: true };
+        const validSolution = { id: "solution-123", value: false };
         const result = suggestSolutionPatches(validSolution);
         expect(result).toEqual([]);
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
