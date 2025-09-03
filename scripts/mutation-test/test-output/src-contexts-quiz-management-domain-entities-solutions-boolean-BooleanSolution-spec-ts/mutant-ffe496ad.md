# Mutant ffe496ad Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5530
**Stable ID**: ffe496ad
**Location**: L116:39–L124:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5530
@@ -112,18 +112,10 @@
       expect(falseResult.isOk()).toBe(true);
       falseSolution = falseResult._unsafeUnwrap();
     });
 
-    describe("isTrue() method", () => {
-      it("should return true for true value", () => {
-        expect(trueSolution.isTrue()).toBe(true);
-      });
+    describe("isTrue() method", () => {});
 
-      it("should return false for false value", () => {
-        expect(falseSolution.isTrue()).toBe(false);
-      });
-    });
-
     describe("isFalse() method", () => {
       it("should return false for true value", () => {
         expect(trueSolution.isFalse()).toBe(false);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
