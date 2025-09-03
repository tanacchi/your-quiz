# Mutant 62d3a9e3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6943
**Stable ID**: 62d3a9e3
**Location**: L101:10–L101:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6943
@@ -97,9 +97,9 @@
         ["id", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
+      ])("", (_field, invalidData) => {
         const result = TagSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
