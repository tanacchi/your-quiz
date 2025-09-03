# Mutant 2f52aee4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5666
**Stable ID**: 2f52aee4
**Location**: L311:45–L311:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5666
@@ -307,9 +307,9 @@
 
   describe("Type Safety", () => {
     it("should enforce return type constraints", () => {
       const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+      const solution = result._unsafeUnwrap({});
 
       // These should compile with correct types
       const id: string = solution.get("id");
       const value: boolean = solution.get("value");
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
