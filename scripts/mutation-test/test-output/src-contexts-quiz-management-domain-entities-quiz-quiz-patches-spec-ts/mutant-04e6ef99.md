# Mutant 04e6ef99 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2126
**Stable ID**: 04e6ef99
**Location**: L444:14–L444:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2126
@@ -440,9 +440,9 @@
     });
   });
 
   describe("Integrated Patch Suggester", () => {
-    describe("suggestQuizPatches", () => {
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
