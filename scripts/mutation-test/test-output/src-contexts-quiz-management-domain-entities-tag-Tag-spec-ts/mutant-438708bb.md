# Mutant 438708bb Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6183
**Stable ID**: 438708bb
**Location**: L84:11–L84:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6183
@@ -80,9 +80,9 @@
 
       const result = Tag.from(tagWithRelations);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (true) {
         const tag = result.value;
         const relations = tag.get("relatedTags");
         expect(relations).toHaveLength(1);
         expect(relations[0]?.relationType).toBe("hierarchy");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
