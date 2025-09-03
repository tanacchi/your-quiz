# Mutant 2d24f1e4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5523
**Stable ID**: 2d24f1e4
**Location**: L99:36–L171:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5523
@@ -95,82 +95,10 @@
       expect(result.isErr()).toBe(true);
     });
   });
 
-  describe("Business Logic", () => {
-    let trueSolution: BooleanSolution;
-    let falseSolution: BooleanSolution;
+  describe("Business Logic", () => {});
 
-    beforeEach(() => {
-      const trueResult = BooleanSolution.from(validSolutionData);
-      expect(trueResult.isOk()).toBe(true);
-      trueSolution = trueResult._unsafeUnwrap();
-
-      const falseResult = BooleanSolution.from({
-        ...validSolutionData,
-        value: false,
-      });
-      expect(falseResult.isOk()).toBe(true);
-      falseSolution = falseResult._unsafeUnwrap();
-    });
-
-    describe("isTrue() method", () => {
-      it("should return true for true value", () => {
-        expect(trueSolution.isTrue()).toBe(true);
-      });
-
-      it("should return false for false value", () => {
-        expect(falseSolution.isTrue()).toBe(false);
-      });
-    });
-
-    describe("isFalse() method", () => {
-      it("should return false for true value", () => {
-        expect(trueSolution.isFalse()).toBe(false);
-      });
-
-      it("should return true for false value", () => {
-        expect(falseSolution.isFalse()).toBe(true);
-      });
-    });
-
-    describe("negate() method", () => {
-      it("should negate true to false", () => {
-        const result = trueSolution.negate();
-        expect(result.isOk()).toBe(true);
-
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated.get("value")).toBe(false);
-          expect(negated.isFalse()).toBe(true);
-        }
-      });
-
-      it("should negate false to true", () => {
-        const result = falseSolution.negate();
-        expect(result.isOk()).toBe(true);
-
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated.get("value")).toBe(true);
-          expect(negated.isTrue()).toBe(true);
-        }
-      });
-
-      it("should return new instance (immutability)", () => {
-        const result = trueSolution.negate();
-        expect(result.isOk()).toBe(true);
-
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated).not.toBe(trueSolution);
-          expect(trueSolution.get("value")).toBe(true); // original unchanged
-          expect(negated.get("value")).toBe(false); // new instance changed
-        }
-      });
-    });
-  });
-
   describe("Attempt Integration", () => {
     let solution: BooleanSolution;
 
     beforeEach(() => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
