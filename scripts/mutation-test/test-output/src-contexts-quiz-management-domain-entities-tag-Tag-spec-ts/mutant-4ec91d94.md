# Mutant 4ec91d94 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6272
**Stable ID**: 4ec91d94
**Location**: L230:8–L230:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6272
@@ -226,9 +226,9 @@
       const synonymTags = tag.getRelatedTagsByType("synonym");
       expect(synonymTags).toHaveLength(0);
     });
 
-    it("should check relation existence", () => {
+    it("", () => {
       expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
       expect(tag.hasRelationWith(TagId.parse("tag-3"), "category")).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
