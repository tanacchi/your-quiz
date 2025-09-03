# Mutant fca31c7b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5631
**Stable ID**: fca31c7b
**Location**: L263:12–L263:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5631
@@ -259,9 +259,9 @@
       expect(entity).toBeDefined();
     });
   });
 
-  describe("Immutability", () => {
+  describe("", () => {
     it("should return new instance on updates", () => {
       const result = BooleanSolution.from(validSolutionData);
       expect(result.isOk()).toBe(true);
       const originalSolution = result._unsafeUnwrap();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
