# Mutant 044e0cc6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5532
**Stable ID**: 044e0cc6
**Location**: L117:53–L119:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5532
@@ -113,11 +113,9 @@
       falseSolution = falseResult._unsafeUnwrap();
     });
 
     describe("isTrue() method", () => {
-      it("should return true for true value", () => {
-        expect(trueSolution.isTrue()).toBe(true);
-      });
+      it("should return true for true value", () => {});
 
       it("should return false for false value", () => {
         expect(falseSolution.isTrue()).toBe(false);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
