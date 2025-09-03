# Mutant 1d1ee965 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6689
**Stable ID**: 1d1ee965
**Location**: L416:8–L416:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6689
@@ -412,9 +412,9 @@
       expect(fixedInput.relatedTags).toEqual([]);
       expect(fixedInput.name).toBe("Rust");
     });
 
-    it("should handle tag with null relatedTags from database", () => {
+    it("", () => {
       const dbTagInput = {
         id: "tag-from-db",
         name: "Database Tag",
         createdBy: "user-db",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
