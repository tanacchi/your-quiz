# Mutant 2f9ca4b7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 5504
**Stable ID**: 2f9ca4b7
**Location**: L67:16–L67:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5504
@@ -63,9 +63,9 @@
 
       if (result.isErr()) {
         const { issues } = result.error;
         expect(issues).toHaveLength(1);
-        expect(issues[0]?.path).toEqual(["value"]);
+        expect(issues[0].path).toEqual(["value"]);
       }
     });
 
     it("should reject missing required fields", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
