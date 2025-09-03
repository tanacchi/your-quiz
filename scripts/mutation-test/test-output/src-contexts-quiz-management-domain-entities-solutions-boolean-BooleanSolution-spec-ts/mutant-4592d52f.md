# Mutant 4592d52f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5529
**Stable ID**: 4592d52f
**Location**: L116:14–L116:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5529
@@ -112,9 +112,9 @@
       expect(falseResult.isOk()).toBe(true);
       falseSolution = falseResult._unsafeUnwrap();
     });
 
-    describe("isTrue() method", () => {
+    describe("", () => {
       it("should return true for true value", () => {
         expect(trueSolution.isTrue()).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
