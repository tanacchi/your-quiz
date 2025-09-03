# Mutant ecc23c42 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4447
**Stable ID**: ecc23c42
**Location**: L352:19–L352:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4447
@@ -348,9 +348,9 @@
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizSummaryPatches", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
+          { path: [], code: "invalid", message: "Invalid" },
         ];
 
         const nonObjectInputs = [null, undefined, "string", 123, true, []];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
