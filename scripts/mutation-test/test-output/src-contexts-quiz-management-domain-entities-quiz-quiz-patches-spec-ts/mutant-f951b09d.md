# Mutant f951b09d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2130
**Stable ID**: f951b09d
**Location**: L446:33–L448:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2130
@@ -442,11 +442,9 @@
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizPatches", () => {
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
