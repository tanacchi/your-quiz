# Mutant 988dca0f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5548
**Stable ID**: 988dca0f
**Location**: L137:47–L146:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5548
@@ -133,19 +133,10 @@
       });
     });
 
     describe("negate() method", () => {
-      it("should negate true to false", () => {
-        const result = trueSolution.negate();
-        expect(result.isOk()).toBe(true);
+      it("should negate true to false", () => {});
 
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated.get("value")).toBe(false);
-          expect(negated.isFalse()).toBe(true);
-        }
-      });
-
       it("should negate false to true", () => {
         const result = falseSolution.negate();
         expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
