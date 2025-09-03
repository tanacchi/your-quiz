# Mutant 9e86bdcb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5472
**Stable ID**: 9e86bdcb
**Location**: L21:61–L24:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5472
@@ -17,12 +17,9 @@
         ["valid single char", "s", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = SolutionId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
   });
 
   describe("Entity Creation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
