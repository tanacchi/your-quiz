# Mutant 35038dc5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5535
**Stable ID**: 35038dc5
**Location**: L121:55–L123:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5535
@@ -117,11 +117,9 @@
       it("should return true for true value", () => {
         expect(trueSolution.isTrue()).toBe(true);
       });
 
-      it("should return false for false value", () => {
-        expect(falseSolution.isTrue()).toBe(false);
-      });
+      it("should return false for false value", () => {});
     });
 
     describe("isFalse() method", () => {
       it("should return false for true value", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
