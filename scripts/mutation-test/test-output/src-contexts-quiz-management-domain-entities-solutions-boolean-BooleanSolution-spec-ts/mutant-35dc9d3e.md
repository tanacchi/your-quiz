# Mutant 35dc9d3e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5650
**Stable ID**: 35dc9d3e
**Location**: L290:8–L290:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5650
@@ -286,9 +286,9 @@
     });
   });
 
   describe("Factory Methods", () => {
-    it("should create BooleanSolution from valid data", () => {
+    it("", () => {
       const result = BooleanSolution.from(validSolutionData);
 
       const solution = result._unsafeUnwrap({ withStackTrace: true });
       expect(solution.get("id")).toBe("solution-1");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
