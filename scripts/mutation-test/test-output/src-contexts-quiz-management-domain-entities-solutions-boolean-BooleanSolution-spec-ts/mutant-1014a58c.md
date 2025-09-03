# Mutant 1014a58c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5538
**Stable ID**: 1014a58c
**Location**: L126:40–L134:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5538
@@ -122,18 +122,10 @@
         expect(falseSolution.isTrue()).toBe(false);
       });
     });
 
-    describe("isFalse() method", () => {
-      it("should return false for true value", () => {
-        expect(trueSolution.isFalse()).toBe(false);
-      });
+    describe("isFalse() method", () => {});
 
-      it("should return true for false value", () => {
-        expect(falseSolution.isFalse()).toBe(true);
-      });
-    });
-
     describe("negate() method", () => {
       it("should negate true to false", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
