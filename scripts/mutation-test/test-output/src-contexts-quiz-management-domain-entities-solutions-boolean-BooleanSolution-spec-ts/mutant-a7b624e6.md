# Mutant a7b624e6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5674
**Stable ID**: a7b624e6
**Location**: L323:8–L323:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5674
@@ -319,9 +319,9 @@
     });
   });
 
   describe("Data Transfer", () => {
-    it("should convert to Data", () => {
+    it("", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
 
       const dto = solution.toData();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
