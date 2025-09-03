# Mutant 93a929d9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5475
**Stable ID**: 93a929d9
**Location**: L29:8–L29:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5475
@@ -25,9 +25,9 @@
     });
   });
 
   describe("Entity Creation", () => {
-    it("should create valid boolean solution from complete data", () => {
+    it("", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
 
       if (result.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
