# Mutant cc0c7c23 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5531
**Stable ID**: cc0c7c23
**Location**: L117:10–L117:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5531
@@ -113,9 +113,9 @@
       falseSolution = falseResult._unsafeUnwrap();
     });
 
     describe("isTrue() method", () => {
-      it("should return true for true value", () => {
+      it("", () => {
         expect(trueSolution.isTrue()).toBe(true);
       });
 
       it("should return false for false value", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
