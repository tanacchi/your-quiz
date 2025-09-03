# Mutant 97e2edb3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6448
**Stable ID**: 97e2edb3
**Location**: L87:10–L87:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6448
@@ -83,9 +83,9 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestTagPatches", () => {
-      it("should return empty array for non-object input", () => {
+      it("", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
