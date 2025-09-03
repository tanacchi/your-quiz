# Mutant 032b2fad Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5540
**Stable ID**: 032b2fad
**Location**: L127:54–L129:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5540
@@ -123,11 +123,9 @@
       });
     });
 
     describe("isFalse() method", () => {
-      it("should return false for true value", () => {
-        expect(trueSolution.isFalse()).toBe(false);
-      });
+      it("should return false for true value", () => {});
 
       it("should return true for false value", () => {
         expect(falseSolution.isFalse()).toBe(true);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
