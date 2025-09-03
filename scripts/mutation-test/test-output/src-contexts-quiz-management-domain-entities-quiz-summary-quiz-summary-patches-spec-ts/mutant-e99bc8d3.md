# Mutant e99bc8d3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4162
**Stable ID**: e99bc8d3
**Location**: L114:30–L114:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4162
@@ -110,9 +110,9 @@
 
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
-        ["solutionId field", "solutionId"],
+        ["solutionId field", ""],
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
