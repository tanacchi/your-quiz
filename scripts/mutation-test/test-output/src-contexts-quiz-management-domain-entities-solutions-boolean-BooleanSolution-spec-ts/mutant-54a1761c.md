# Mutant 54a1761c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5499
**Stable ID**: 54a1761c
**Location**: L58:16–L58:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5499
@@ -54,9 +54,9 @@
 
     it("should reject invalid data types", () => {
       const invalidData = {
         id: SolutionId.parse("solution-1"),
-        value: "not-a-boolean",
+        value: "",
       };
 
       const result = BooleanSolution.from(invalidData);
       expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
