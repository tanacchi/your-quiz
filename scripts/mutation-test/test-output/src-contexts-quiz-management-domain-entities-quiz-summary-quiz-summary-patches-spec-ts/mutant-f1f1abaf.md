# Mutant f1f1abaf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4443
**Stable ID**: f1f1abaf
**Location**: L350:10–L350:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4443
@@ -346,9 +346,9 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizSummaryPatches", () => {
-      it("should return empty array for non-object input", () => {
+      it("", () => {
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
