# Mutant f74e49a9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6738
**Stable ID**: f74e49a9
**Location**: L509:13–L509:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6738
@@ -505,9 +505,9 @@
     });
 
     it("should maintain referential integrity of non-patched fields", () => {
       const originalInput = {
-        id: "tag-integrity",
+        id: "",
         name: "Integrity Test",
         createdBy: "user-integrity",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
