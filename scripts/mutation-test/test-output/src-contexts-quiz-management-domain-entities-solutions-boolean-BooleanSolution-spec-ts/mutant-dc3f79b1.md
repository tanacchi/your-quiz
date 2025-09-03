# Mutant dc3f79b1 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5440
**Stable ID**: dc3f79b1
**Location**: L12:15–L21:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5440
@@ -8,18 +8,9 @@
   } as const;
 
   describe("Brand Types", () => {
     describe("SolutionId validation", () => {
-      it.each([
-        ["valid alphanumeric", "solution-1", true],
-        ["valid with numbers", "solution123", true],
-        ["valid with underscore", "solution_test", true],
-        ["valid with dash", "solution-test", true],
-        ["valid single char", "s", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = SolutionId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
