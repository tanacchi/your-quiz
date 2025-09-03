# Mutant a38aee97 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6934
**Stable ID**: a38aee97
**Location**: L98:9–L98:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6934
@@ -94,9 +94,9 @@
       });
 
       it.each([
         ["id", { ...validTagData, id: undefined }],
-        ["name", { ...validTagData, name: undefined }],
+        [],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
