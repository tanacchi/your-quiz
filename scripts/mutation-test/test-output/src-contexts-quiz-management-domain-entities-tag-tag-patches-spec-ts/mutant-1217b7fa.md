# Mutant 1217b7fa Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6693
**Stable ID**: 1217b7fa
**Location**: L419:15–L419:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6693
@@ -415,9 +415,9 @@
 
     it("should handle tag with null relatedTags from database", () => {
       const dbTagInput = {
         id: "tag-from-db",
-        name: "Database Tag",
+        name: "",
         createdBy: "user-db",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null, // Common when field is nullable in database
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
