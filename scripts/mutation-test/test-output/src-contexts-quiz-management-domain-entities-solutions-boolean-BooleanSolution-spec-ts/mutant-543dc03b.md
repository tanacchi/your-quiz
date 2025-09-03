# Mutant 543dc03b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5517
**Stable ID**: 543dc03b
**Location**: L88:8–L88:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5517
@@ -84,9 +84,9 @@
         expect(valueError).toBeDefined();
       }
     });
 
-    it("should reject extra fields (strict mode)", () => {
+    it("", () => {
       const extraFieldData = {
         ...validSolutionData,
         extraField: "should-not-be-allowed",
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
