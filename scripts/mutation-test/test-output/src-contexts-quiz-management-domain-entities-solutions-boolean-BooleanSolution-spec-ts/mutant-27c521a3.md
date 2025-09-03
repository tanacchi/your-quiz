# Mutant 27c521a3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5476
**Stable ID**: 27c521a3
**Location**: L29:73–L38:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5476
@@ -25,19 +25,10 @@
     });
   });
 
   describe("Entity Creation", () => {
-    it("should create valid boolean solution from complete data", () => {
-      const result = BooleanSolution.from(validSolutionData);
-      expect(result.isOk()).toBe(true);
+    it("should create valid boolean solution from complete data", () => {});
 
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("id")).toBe("solution-1");
-        expect(solution.get("value")).toBe(true);
-      }
-    });
-
     it("should create boolean solution with false value", () => {
       const falseData = {
         ...validSolutionData,
         value: false,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
