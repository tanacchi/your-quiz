# Mutant 65dc473e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5473
**Stable ID**: 65dc473e
**Location**: L28:12–L28:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5473
@@ -24,9 +24,9 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
+  describe("", () => {
     it("should create valid boolean solution from complete data", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
