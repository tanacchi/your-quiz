# Mutant faee1d31 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2010
**Stable ID**: faee1d31
**Location**: L244:52–L259:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2010
@@ -240,25 +240,10 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should handle undefined solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
+      it("should handle undefined solution", () => {});
 
-        const result = suggestSolutionPatches(undefined);
-        expect(result).toEqual([
-          {
-            solution: {
-              id: `solution-${mockTimestamp}`,
-              value: false,
-            },
-          },
-        ]);
-
-        vi.restoreAllMocks();
-      });
-
       it("should handle invalid solution object", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
