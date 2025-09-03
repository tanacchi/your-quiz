# Mutant f70274b4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2048
**Stable ID**: f70274b4
**Location**: L313:61–L322:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2048
@@ -309,19 +309,10 @@
           },
         ]);
       });
 
-      it("should handle solution with whitespace id", () => {
-        const solutionWithWhitespaceId = {
-          id: "  solution-123  ",
-          value: false,
-        };
-        const result = suggestSolutionPatches(solutionWithWhitespaceId);
+      it("should handle solution with whitespace id", () => {});
 
-        // SolutionId accepts whitespace, so no patch should be suggested for valid solution
-        expect(result).toEqual([]);
-      });
-
       it("should not suggest patch for valid solution", () => {
         const validSolution = { id: "solution-123", value: true };
         const result = suggestSolutionPatches(validSolution);
         expect(result).toEqual([]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
