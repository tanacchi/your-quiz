# Mutant a4ce02d2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6271
**Stable ID**: a4ce02d2
**Location**: L226:52–L226:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6271
@@ -222,9 +222,9 @@
       const categoryTags = tag.getRelatedTagsByType("category");
       expect(categoryTags).toHaveLength(1);
       expect(categoryTags[0]?.name).toBe("Web Development");
 
-      const synonymTags = tag.getRelatedTagsByType("synonym");
+      const synonymTags = tag.getRelatedTagsByType("");
       expect(synonymTags).toHaveLength(0);
     });
 
     it("should check relation existence", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
