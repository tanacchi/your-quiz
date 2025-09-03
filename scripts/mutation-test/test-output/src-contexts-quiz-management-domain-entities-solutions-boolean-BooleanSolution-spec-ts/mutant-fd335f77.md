# Mutant fd335f77 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5676
**Stable ID**: fd335f77
**Location**: L325:45–L325:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5676
@@ -321,9 +321,9 @@
 
   describe("Data Transfer", () => {
     it("should convert to Data", () => {
       const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+      const solution = result._unsafeUnwrap({});
 
       const dto = solution.toData();
 
       expect(dto.id).toBe("solution-1");
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
