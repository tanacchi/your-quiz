# Mutant dd2f1fab Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2285
**Stable ID**: dd2f1fab
**Location**: L563:27–L563:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2285
@@ -559,9 +559,9 @@
 
       it("should include consistency patches at the end", () => {
         const input = {
           answerType: "single_choice",
-          solution: { id: "solution-123", value: true },
+          solution: { id: "", value: true },
         };
 
         const issues: Issue[] = [
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
