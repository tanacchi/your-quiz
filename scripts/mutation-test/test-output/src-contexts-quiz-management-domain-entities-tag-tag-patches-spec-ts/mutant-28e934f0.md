# Mutant 28e934f0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6708
**Stable ID**: 28e934f0
**Location**: L446:20–L446:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6708
@@ -442,9 +442,9 @@
     it("should handle tag import from external source", () => {
       const importedTagInput = {
         id: "tag-imported",
         name: "Imported Tag",
-        createdBy: "user-importer",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: undefined, // Common when importing from sources that don't have this field
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
