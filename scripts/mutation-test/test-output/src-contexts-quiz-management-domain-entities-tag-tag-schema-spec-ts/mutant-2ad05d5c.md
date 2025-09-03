# Mutant 2ad05d5c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7367
**Stable ID**: 2ad05d5c
**Location**: L594:27–L596:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7367
@@ -590,11 +590,9 @@
 
       const result = TagSchema.safeParse(minimalTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.relatedTags).toEqual([]);
-      }
+      if (result.success) {}
     });
 
     it("should handle tag with unicode and special characters", () => {
       const unicodeTag = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
