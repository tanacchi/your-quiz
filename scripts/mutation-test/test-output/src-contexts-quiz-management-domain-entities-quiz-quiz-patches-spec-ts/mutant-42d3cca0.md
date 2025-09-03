# Mutant 42d3cca0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2286
**Stable ID**: 42d3cca0
**Location**: L563:50–L563:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2286
@@ -559,9 +559,9 @@
 
       it("should include consistency patches at the end", () => {
         const input = {
           answerType: "single_choice",
-          solution: { id: "solution-123", value: true },
+          solution: { id: "solution-123", value: false },
         };
 
         const issues: Issue[] = [
           {
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
