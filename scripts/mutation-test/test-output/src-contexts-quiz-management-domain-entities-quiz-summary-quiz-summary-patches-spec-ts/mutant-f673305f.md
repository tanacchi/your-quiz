# Mutant f673305f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4441
**Stable ID**: f673305f
**Location**: L349:14–L349:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4441
@@ -345,9 +345,9 @@
     });
   });
 
   describe("Integrated Patch Suggester", () => {
-    describe("suggestQuizSummaryPatches", () => {
+    describe("", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
