# Mutant bad3f15b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5437
**Stable ID**: bad3f15b
**Location**: L10:33–L26:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5437
@@ -6,25 +6,9 @@
     id: SolutionId.parse("solution-1"),
     value: true,
   } as const;
 
-  describe("Brand Types", () => {
-    describe("SolutionId validation", () => {
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
-        const result = SolutionId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-  });
+  describe("Brand Types", () => {});
 
   describe("Entity Creation", () => {
     it("should create valid boolean solution from complete data", () => {
       const result = BooleanSolution.from(validSolutionData);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
