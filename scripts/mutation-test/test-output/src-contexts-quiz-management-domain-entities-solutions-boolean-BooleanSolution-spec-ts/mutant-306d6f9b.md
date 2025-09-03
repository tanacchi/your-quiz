# Mutant 306d6f9b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5570
**Stable ID**: 306d6f9b
**Location**: L163:28–L168:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5570
@@ -159,14 +159,9 @@
       it("should return new instance (immutability)", () => {
         const result = trueSolution.negate();
         expect(result.isOk()).toBe(true);
 
-        if (result.isOk()) {
-          const negated = result.value;
-          expect(negated).not.toBe(trueSolution);
-          expect(trueSolution.get("value")).toBe(true); // original unchanged
-          expect(negated.get("value")).toBe(false); // new instance changed
-        }
+        if (result.isOk()) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
