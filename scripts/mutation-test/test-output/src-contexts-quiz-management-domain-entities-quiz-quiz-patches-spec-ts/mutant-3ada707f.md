# Mutant 3ada707f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2124
**Stable ID**: 3ada707f
**Location**: L443:12–L443:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2124
@@ -439,9 +439,9 @@
       });
     });
   });
 
-  describe("Integrated Patch Suggester", () => {
+  describe("", () => {
     describe("suggestQuizPatches", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
