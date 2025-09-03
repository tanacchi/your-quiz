# Mutant 39bb185e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5675
**Stable ID**: 39bb185e
**Location**: L323:40–L331:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5675
@@ -319,18 +319,10 @@
     });
   });
 
   describe("Data Transfer", () => {
-    it("should convert to Data", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+    it("should convert to Data", () => {});
 
-      const dto = solution.toData();
-
-      expect(dto.id).toBe("solution-1");
-      expect(dto.value).toBe(true);
-    });
-
     it("should deep clone in toData", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
