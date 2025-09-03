# Mutant 2d80f477 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6739
**Stable ID**: 2d80f477
**Location**: L510:15–L510:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6739
@@ -506,9 +506,9 @@
 
     it("should maintain referential integrity of non-patched fields", () => {
       const originalInput = {
         id: "tag-integrity",
-        name: "Integrity Test",
+        name: "",
         createdBy: "user-integrity",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
