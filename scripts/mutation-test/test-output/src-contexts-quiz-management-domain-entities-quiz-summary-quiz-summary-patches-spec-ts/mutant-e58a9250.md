# Mutant e58a9250 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4450
**Stable ID**: e58a9250
**Location**: L352:59–L352:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4450
@@ -348,9 +348,9 @@
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizSummaryPatches", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
+          { path: ["question"], code: "invalid", message: "" },
         ];
 
         const nonObjectInputs = [null, undefined, "string", 123, true, []];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
