# Mutant 86036bdb Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5617
**Stable ID**: 86036bdb
**Location**: L235:8–L235:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5617
@@ -231,9 +231,9 @@
         expect(solution.get("id")).toBe("solution-draft");
       }
     });
 
-    it("should handle Draft validation errors", () => {
+    it("", () => {
       const draft = new BooleanSolution.Draft();
       // Test with invalid data by using with() instead of update()
       draft.with({
         id: SolutionId.parse("solution-draft"),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
