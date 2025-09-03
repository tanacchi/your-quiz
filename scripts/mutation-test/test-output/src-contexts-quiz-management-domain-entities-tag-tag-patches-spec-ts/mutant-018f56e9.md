# Mutant 018f56e9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6694
**Stable ID**: 018f56e9
**Location**: L420:20–L420:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6694
@@ -416,9 +416,9 @@
     it("should handle tag with null relatedTags from database", () => {
       const dbTagInput = {
         id: "tag-from-db",
         name: "Database Tag",
-        createdBy: "user-db",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null, // Common when field is nullable in database
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
