# Mutant 026a0a58 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5603
**Stable ID**: 026a0a58
**Location**: L218:8–L218:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5603
@@ -214,9 +214,9 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
+    it("", () => {
       const draft = new BooleanSolution.Draft();
       draft.update("value", false);
       draft.with({
         id: SolutionId.parse("solution-draft"),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
