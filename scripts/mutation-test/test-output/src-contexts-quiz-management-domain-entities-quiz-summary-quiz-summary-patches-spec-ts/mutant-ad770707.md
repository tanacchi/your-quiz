# Mutant ad770707 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4439
**Stable ID**: ad770707
**Location**: L348:12–L348:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4439
@@ -344,9 +344,9 @@
       });
     });
   });
 
-  describe("Integrated Patch Suggester", () => {
+  describe("", () => {
     describe("suggestQuizSummaryPatches", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
