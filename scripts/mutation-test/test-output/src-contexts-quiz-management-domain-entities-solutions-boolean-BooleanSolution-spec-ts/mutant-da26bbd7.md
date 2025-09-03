# Mutant da26bbd7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5486
**Stable ID**: da26bbd7
**Location**: L40:65–L53:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5486
@@ -36,23 +36,10 @@
         expect(solution.get("value")).toBe(true);
       }
     });
 
-    it("should create boolean solution with false value", () => {
-      const falseData = {
-        ...validSolutionData,
-        value: false,
-      };
+    it("should create boolean solution with false value", () => {});
 
-      const result = BooleanSolution.from(falseData);
-      expect(result.isOk()).toBe(true);
-
-      if (result.isOk()) {
-        const solution = result.value;
-        expect(solution.get("value")).toBe(false);
-      }
-    });
-
     it("should reject invalid data types", () => {
       const invalidData = {
         id: SolutionId.parse("solution-1"),
         value: "not-a-boolean",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
