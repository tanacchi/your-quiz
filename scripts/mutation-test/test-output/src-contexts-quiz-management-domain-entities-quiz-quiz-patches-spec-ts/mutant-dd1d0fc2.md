# Mutant dd1d0fc2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2128
**Stable ID**: dd1d0fc2
**Location**: L445:10–L445:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2128
@@ -441,9 +441,9 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizPatches", () => {
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
