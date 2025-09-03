# Mutant 8c4655e3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6735
**Stable ID**: 8c4655e3
**Location**: L507:8–L507:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6735
@@ -503,9 +503,9 @@
       expect(secondApplication).toEqual(thirdApplication);
       expect(firstApplication.relatedTags).toEqual([]);
     });
 
-    it("should maintain referential integrity of non-patched fields", () => {
+    it("", () => {
       const originalInput = {
         id: "tag-integrity",
         name: "Integrity Test",
         createdBy: "user-integrity",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
