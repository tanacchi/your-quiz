# Mutant bc1c4fc2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5480
**Stable ID**: bc1c4fc2
**Location**: L33:26–L37:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5480
@@ -29,13 +29,9 @@
     it("should create valid boolean solution from complete data", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("id")).toBe("solution-1");
-        expect(solution.get("value")).toBe(true);
-      }
+      if (result.isOk()) {}
     });
 
     it("should create boolean solution with false value", () => {
       const falseData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
