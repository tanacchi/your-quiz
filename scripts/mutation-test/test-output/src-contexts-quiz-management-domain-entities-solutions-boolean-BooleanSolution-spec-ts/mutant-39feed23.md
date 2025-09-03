# Mutant 39feed23 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5658
**Stable ID**: 39feed23
**Location**: L298:8–L298:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5658
@@ -294,9 +294,9 @@
       expect(solution.get("id")).toBe("solution-1");
       expect(solution.get("value")).toBe(true);
     });
 
-    it("should create from draft", () => {
+    it("", () => {
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
 
       const result = BooleanSolution.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
