# Mutant 8317df4c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6932
**Stable ID**: 8317df4c
**Location**: L97:10–L97:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6932
@@ -93,9 +93,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validTagData, id: undefined }],
+        ["", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
