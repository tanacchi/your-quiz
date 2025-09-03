# Mutant 9e41faba Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4445
**Stable ID**: 9e41faba
**Location**: L351:33–L353:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4445
@@ -347,11 +347,9 @@
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizSummaryPatches", () => {
       it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
-        ];
+        const issues: Issue[] = [];
 
         const nonObjectInputs = [null, undefined, "string", 123, true, []];
 
         nonObjectInputs.forEach((input) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
