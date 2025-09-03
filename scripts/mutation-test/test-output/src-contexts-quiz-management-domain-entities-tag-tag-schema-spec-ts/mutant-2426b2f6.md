# Mutant 2426b2f6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6935
**Stable ID**: 2426b2f6
**Location**: L98:10–L98:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6935
@@ -94,9 +94,9 @@
       });
 
       it.each([
         ["id", { ...validTagData, id: undefined }],
-        ["name", { ...validTagData, name: undefined }],
+        ["", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
