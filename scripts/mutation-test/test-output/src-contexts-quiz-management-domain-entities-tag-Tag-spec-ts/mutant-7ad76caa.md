# Mutant 7ad76caa Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6196
**Stable ID**: 7ad76caa
**Location**: L102:11–L102:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6196
@@ -98,9 +98,9 @@
 
       const result = Tag.from(invalidData);
       expect(result.isOk()).toBe(true); // null transforms to []
 
-      if (result.isOk()) {
+      if (false) {
         const tag = result.value;
         expect(tag.get("relatedTags")).toEqual([]);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
