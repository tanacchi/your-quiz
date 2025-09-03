# Mutant 37d55a34 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5566
**Stable ID**: 37d55a34
**Location**: L159:61–L169:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5566
@@ -155,19 +155,9 @@
           expect(negated.isTrue()).toBe(true);
         }
       });
 
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
+      it("should return new instance (immutability)", () => {});
     });
   });
 
   describe("Attempt Integration", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
