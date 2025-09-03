# Mutant c55264c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2028
**Stable ID**: c55264c9
**Location**: L280:58–L297:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2028
@@ -276,27 +276,10 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should handle solution with invalid id", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
+      it("should handle solution with invalid id", () => {});
 
-        const solutionWithInvalidId = { id: 123, value: true };
-        const result = suggestSolutionPatches(solutionWithInvalidId);
-
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: true,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
       it("should handle solution with valid id but invalid value", () => {
         const solutionWithInvalidValue = { id: "valid-id", value: "true" };
         const result = suggestSolutionPatches(solutionWithInvalidValue);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
