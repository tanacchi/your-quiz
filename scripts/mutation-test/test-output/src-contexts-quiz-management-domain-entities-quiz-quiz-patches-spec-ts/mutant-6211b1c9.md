# Mutant 6211b1c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2132
**Stable ID**: 6211b1c9
**Location**: L447:19–L447:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2132
@@ -443,9 +443,9 @@
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizPatches", () => {
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
