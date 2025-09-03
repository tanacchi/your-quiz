# Mutant 7efe8a2e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4165
**Stable ID**: 7efe8a2e
**Location**: L115:29–L115:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4165
@@ -111,9 +111,9 @@
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
-        ["creatorId field", "creatorId"],
+        ["creatorId field", ""],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
         );
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
