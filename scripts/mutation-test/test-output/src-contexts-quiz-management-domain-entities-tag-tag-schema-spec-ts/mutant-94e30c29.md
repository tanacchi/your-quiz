# Mutant 94e30c29 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6937
**Stable ID**: 94e30c29
**Location**: L99:9–L99:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6937
@@ -95,9 +95,9 @@
 
       it.each([
         ["id", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
-        ["createdBy", { ...validTagData, createdBy: undefined }],
+        [],
         ["createdAt", { ...validTagData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
