# Mutant 5f2b8cbe Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5680
**Stable ID**: 5f2b8cbe
**Location**: L333:8–L333:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5680
@@ -329,9 +329,9 @@
       expect(dto.id).toBe("solution-1");
       expect(dto.value).toBe(true);
     });
 
-    it("should deep clone in toData", () => {
+    it("", () => {
       const result = BooleanSolution.from(validSolutionData);
       const solution = result._unsafeUnwrap({ withStackTrace: true });
 
       const dto1 = solution.toData();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
