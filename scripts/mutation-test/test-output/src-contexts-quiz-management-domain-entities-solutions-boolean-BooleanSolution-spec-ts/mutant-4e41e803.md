# Mutant 4e41e803 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5518
**Stable ID**: 4e41e803
**Location**: L88:58–L96:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5518
@@ -84,17 +84,9 @@
         expect(valueError).toBeDefined();
       }
     });
 
-    it("should reject extra fields (strict mode)", () => {
-      const extraFieldData = {
-        ...validSolutionData,
-        extraField: "should-not-be-allowed",
-      };
-
-      const result = BooleanSolution.from(extraFieldData);
-      expect(result.isErr()).toBe(true);
-    });
+    it("should reject extra fields (strict mode)", () => {});
   });
 
   describe("Business Logic", () => {
     let trueSolution: BooleanSolution;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
