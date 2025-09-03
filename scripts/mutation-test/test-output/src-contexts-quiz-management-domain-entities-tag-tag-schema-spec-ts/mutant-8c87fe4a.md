# Mutant 8c87fe4a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6936
**Stable ID**: 8c87fe4a
**Location**: L98:18–L98:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6936
@@ -94,9 +94,9 @@
       });
 
       it.each([
         ["id", { ...validTagData, id: undefined }],
-        ["name", { ...validTagData, name: undefined }],
+        ["name", {}],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
