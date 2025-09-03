# Mutant 5e878ac7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6930
**Stable ID**: 5e878ac7
**Location**: L96:15–L101:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6930
@@ -92,14 +92,9 @@
           expect(data.relatedTags).toEqual(validTagData.relatedTags);
         }
       });
 
-      it.each([
-        ["id", { ...validTagData, id: undefined }],
-        ["name", { ...validTagData, name: undefined }],
-        ["createdBy", { ...validTagData, createdBy: undefined }],
-        ["createdAt", { ...validTagData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
+      it.each([])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
