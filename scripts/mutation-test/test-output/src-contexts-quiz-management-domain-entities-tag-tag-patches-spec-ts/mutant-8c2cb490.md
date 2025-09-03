# Mutant 8c2cb490 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6691
**Stable ID**: 8c2cb490
**Location**: L417:26–L423:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6691
@@ -413,15 +413,9 @@
       expect(fixedInput.name).toBe("Rust");
     });
 
     it("should handle tag with null relatedTags from database", () => {
-      const dbTagInput = {
-        id: "tag-from-db",
-        name: "Database Tag",
-        createdBy: "user-db",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null, // Common when field is nullable in database
-      };
+      const dbTagInput = {};
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
