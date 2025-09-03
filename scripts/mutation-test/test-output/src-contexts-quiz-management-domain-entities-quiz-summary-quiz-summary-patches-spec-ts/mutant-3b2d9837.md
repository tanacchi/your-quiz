# Mutant 3b2d9837 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4163
**Stable ID**: 3b2d9837
**Location**: L115:9–L115:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4163
@@ -111,9 +111,9 @@
     describe("suggestIdFieldPatches", () => {
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
-        ["creatorId field", "creatorId"],
+        [],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
         );
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
