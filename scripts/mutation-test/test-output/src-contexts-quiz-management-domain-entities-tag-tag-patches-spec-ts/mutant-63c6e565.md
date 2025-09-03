# Mutant 63c6e565 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6692
**Stable ID**: 63c6e565
**Location**: L418:13–L418:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6692
@@ -414,9 +414,9 @@
     });
 
     it("should handle tag with null relatedTags from database", () => {
       const dbTagInput = {
-        id: "tag-from-db",
+        id: "",
         name: "Database Tag",
         createdBy: "user-db",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null, // Common when field is nullable in database
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
