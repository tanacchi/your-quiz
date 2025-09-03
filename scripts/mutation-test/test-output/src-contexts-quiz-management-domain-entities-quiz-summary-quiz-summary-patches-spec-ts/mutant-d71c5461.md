# Mutant d71c5461 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4156
**Stable ID**: d71c5461
**Location**: L112:15–L116:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4156
@@ -108,13 +108,9 @@
       });
     });
 
     describe("suggestIdFieldPatches", () => {
-      it.each([
-        ["id field", "id"],
-        ["solutionId field", "solutionId"],
-        ["creatorId field", "creatorId"],
-      ])("should handle %s", (_desc, fieldName) => {
+      it.each([])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
           fieldName as keyof QuizSummaryInput,
         );
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
