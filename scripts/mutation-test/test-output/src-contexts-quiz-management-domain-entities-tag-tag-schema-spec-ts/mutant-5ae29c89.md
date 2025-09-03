# Mutant 5ae29c89 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6942
**Stable ID**: 5ae29c89
**Location**: L100:23–L100:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6942
@@ -96,9 +96,9 @@
       it.each([
         ["id", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
-        ["createdAt", { ...validTagData, createdAt: undefined }],
+        ["createdAt", {}],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
