# Mutant b6b61bdb Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6925
**Stable ID**: b6b61bdb
**Location**: L82:57–L94:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6925
@@ -78,22 +78,10 @@
   });
 
   describe("TagSchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid complete tag data", () => {
-        const result = TagSchema.safeParse(validTagData);
-        expect(result.success).toBe(true);
+      it("should accept valid complete tag data", () => {});
 
-        if (result.success) {
-          const data = result.data as TagData;
-          expect(data.id).toBe(validTagData.id);
-          expect(data.name).toBe(validTagData.name);
-          expect(data.createdBy).toBe(validTagData.createdBy);
-          expect(data.createdAt).toBe(validTagData.createdAt);
-          expect(data.relatedTags).toEqual(validTagData.relatedTags);
-        }
-      });
-
       it.each([
         ["id", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
