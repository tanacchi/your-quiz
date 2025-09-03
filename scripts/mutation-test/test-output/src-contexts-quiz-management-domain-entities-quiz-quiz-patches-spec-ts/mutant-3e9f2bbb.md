# Mutant 3e9f2bbb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2002
**Stable ID**: 3e9f2bbb
**Location**: L227:47–L242:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2002
@@ -223,25 +223,10 @@
       });
     });
 
     describe("suggestSolutionPatches", () => {
-      it("should handle null solution", () => {
-        const mockTimestamp = 1234567890;
-        vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
+      it("should handle null solution", () => {});
 
-        const result = suggestSolutionPatches(null);
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
       it("should handle undefined solution", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
