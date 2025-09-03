# Mutant 71eab630 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6929
**Stable ID**: 71eab630
**Location**: L86:29–L93:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6929
@@ -82,16 +82,9 @@
       it("should accept valid complete tag data", () => {
         const result = TagSchema.safeParse(validTagData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          const data = result.data as TagData;
-          expect(data.id).toBe(validTagData.id);
-          expect(data.name).toBe(validTagData.name);
-          expect(data.createdBy).toBe(validTagData.createdBy);
-          expect(data.createdAt).toBe(validTagData.createdAt);
-          expect(data.relatedTags).toEqual(validTagData.relatedTags);
-        }
+        if (result.success) {}
       });
 
       it.each([
         ["id", { ...validTagData, id: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
