# Mutant 7fae3f20 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5546
**Stable ID**: 7fae3f20
**Location**: L136:39–L170:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5546
@@ -132,43 +132,9 @@
         expect(falseSolution.isFalse()).toBe(true);
       });
     });
 
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
+    describe("negate() method", () => {});
   });
 
   describe("Attempt Integration", () => {
     let solution: BooleanSolution;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
