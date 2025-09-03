# Mutant ca05b174 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4160
**Stable ID**: ca05b174
**Location**: L114:9–L114:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4160
@@ -110,9 +110,9 @@
 
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
-        ["solutionId field", "solutionId"],
+        [],
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
