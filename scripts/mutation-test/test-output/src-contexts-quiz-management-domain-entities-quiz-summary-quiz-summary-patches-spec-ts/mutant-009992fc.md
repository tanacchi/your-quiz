# Mutant 009992fc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4166
**Stable ID**: 009992fc
**Location**: L116:10–L116:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4166
@@ -112,9 +112,9 @@
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
         ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
+      ])("", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
         );
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
