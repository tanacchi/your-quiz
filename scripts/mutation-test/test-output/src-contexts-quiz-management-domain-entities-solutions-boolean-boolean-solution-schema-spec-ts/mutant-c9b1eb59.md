# Mutant c9b1eb59 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5721
**Stable ID**: c9b1eb59
**Location**: L14:12–L14:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5721
@@ -10,9 +10,9 @@
     id: "solution-123",
     value: true,
   };
 
-  describe("BooleanSolutionSchema Validation", () => {
+  describe("", () => {
     describe("Required Fields", () => {
       it("should accept valid boolean solution with true value", () => {
         const result = BooleanSolutionSchema.safeParse(
           validBooleanSolutionData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
