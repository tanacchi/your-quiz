# Mutant d105ace2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5677
**Stable ID**: d105ace2
**Location**: L325:63–L325:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5677
@@ -321,9 +321,9 @@
 
   describe("Data Transfer", () => {
     it("should convert to Data", () => {
       const result = BooleanSolution.from(validSolutionData);
-      const solution = result._unsafeUnwrap({ withStackTrace: true });
+      const solution = result._unsafeUnwrap({ withStackTrace: false });
 
       const dto = solution.toData();
 
       expect(dto.id).toBe("solution-1");
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
