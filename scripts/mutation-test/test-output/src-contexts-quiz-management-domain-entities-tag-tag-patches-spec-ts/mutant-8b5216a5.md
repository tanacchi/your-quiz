# Mutant 8b5216a5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6450
**Stable ID**: 8b5216a5
**Location**: L88:33–L90:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6450
@@ -84,11 +84,9 @@
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestTagPatches", () => {
       it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
+        const issues: Issue[] = [];
 
         const nonObjectInputs = ["string", 123, true];
 
         nonObjectInputs.forEach((input) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
