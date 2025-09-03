# Mutant 8696de26 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6452
**Stable ID**: 8696de26
**Location**: L89:19–L89:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6452
@@ -85,9 +85,9 @@
   describe("Integrated Patch Suggester", () => {
     describe("suggestTagPatches", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          { path: [], code: "invalid", message: "Invalid" },
         ];
 
         const nonObjectInputs = ["string", 123, true];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
