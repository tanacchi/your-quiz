# Mutant 0e60995d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5723
**Stable ID**: 0e60995d
**Location**: L15:14–L15:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5723
@@ -11,9 +11,9 @@
     value: true,
   };
 
   describe("BooleanSolutionSchema Validation", () => {
-    describe("Required Fields", () => {
+    describe("", () => {
       it("should accept valid boolean solution with true value", () => {
         const result = BooleanSolutionSchema.safeParse(
           validBooleanSolutionData,
         );
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
