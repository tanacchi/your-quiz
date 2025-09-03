# Mutant 07d340e8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6446
**Stable ID**: 07d340e8
**Location**: L86:14–L86:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6446
@@ -82,9 +82,9 @@
     });
   });
 
   describe("Integrated Patch Suggester", () => {
-    describe("suggestTagPatches", () => {
+    describe("", () => {
       it("should return empty array for non-object input", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
