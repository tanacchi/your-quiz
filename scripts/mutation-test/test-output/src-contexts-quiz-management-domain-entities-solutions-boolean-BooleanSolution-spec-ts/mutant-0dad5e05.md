# Mutant 0dad5e05 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5652
**Stable ID**: 0dad5e05
**Location**: L293:45–L293:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5652
@@ -289,9 +289,9 @@
   describe("Factory Methods", () => {
     it("should create BooleanSolution from valid data", () => {
       const result = BooleanSolution.from(validSolutionData);
 
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+      const solution = result._unsafeUnwrap({});
       expect(solution.get("id")).toBe("solution-1");
       expect(solution.get("value")).toBe(true);
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
