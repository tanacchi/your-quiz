# Mutant 6ab38618 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5507
**Stable ID**: 6ab38618
**Location**: L71:8–L71:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5507
@@ -67,9 +67,9 @@
         expect(issues[0]?.path).toEqual(["value"]);
       }
     });
 
-    it("should reject missing required fields", () => {
+    it("", () => {
       const incompleteData = {
         id: SolutionId.parse("solution-1"),
         // value is missing
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
