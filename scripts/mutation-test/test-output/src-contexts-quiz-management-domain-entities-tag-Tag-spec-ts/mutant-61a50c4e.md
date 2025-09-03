# Mutant 61a50c4e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 6266
**Stable ID**: 61a50c4e
**Location**: L220:14–L220:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6266
@@ -216,9 +216,9 @@
 
     it("should get related tags by type", () => {
       const hierarchyTags = tag.getRelatedTagsByType("hierarchy");
       expect(hierarchyTags).toHaveLength(1);
-      expect(hierarchyTags[0]?.name).toBe("Programming");
+      expect(hierarchyTags[0].name).toBe("Programming");
 
       const categoryTags = tag.getRelatedTagsByType("category");
       expect(categoryTags).toHaveLength(1);
       expect(categoryTags[0]?.name).toBe("Web Development");
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
