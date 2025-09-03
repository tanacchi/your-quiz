# Mutant dd7a6954 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5928
**Stable ID**: dd7a6954
**Location**: L180:10–L180:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5928
@@ -176,9 +176,9 @@
       });
     });
 
     describe("Type Safety", () => {
-      it("should ensure value is exactly boolean type", () => {
+      it("", () => {
         const result = BooleanSolutionSchema.safeParse(
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
