# Mutant e2cde1f8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5601
**Stable ID**: e2cde1f8
**Location**: L217:12–L217:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5601
@@ -213,9 +213,9 @@
       });
     });
   });
 
-  describe("Draft Usage", () => {
+  describe("", () => {
     it("should work with Draft pattern", () => {
       const draft = new BooleanSolution.Draft();
       draft.update("value", false);
       draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
