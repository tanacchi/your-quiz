# Mutant f11fd67a Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5945
**Stable ID**: f11fd67a
**Location**: L194:10–L194:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5945
@@ -190,9 +190,9 @@
           ).toBe(true);
         }
       });
 
-      it("should preserve boolean type across multiple validations", () => {
+      it("", () => {
         const trueData = { id: "test-true", value: true };
         const falseData = { id: "test-false", value: false };
 
         const trueResult = BooleanSolutionSchema.safeParse(trueData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
