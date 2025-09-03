# Mutant 8fb6fa39 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 6269
**Stable ID**: 8fb6fa39
**Location**: L224:14–L224:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6269
@@ -220,9 +220,9 @@
       expect(hierarchyTags[0]?.name).toBe("Programming");
 
       const categoryTags = tag.getRelatedTagsByType("category");
       expect(categoryTags).toHaveLength(1);
-      expect(categoryTags[0]?.name).toBe("Web Development");
+      expect(categoryTags[0].name).toBe("Web Development");
 
       const synonymTags = tag.getRelatedTagsByType("synonym");
       expect(synonymTags).toHaveLength(0);
     });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
