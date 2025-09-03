# Mutant fd2c1154 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6944
**Stable ID**: fd2c1154
**Location**: L101:79–L104:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6944
@@ -97,12 +97,9 @@
         ["id", { ...validTagData, id: undefined }],
         ["name", { ...validTagData, name: undefined }],
         ["createdBy", { ...validTagData, createdBy: undefined }],
         ["createdAt", { ...validTagData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = TagSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
+      ])("should reject missing required field: %s", (_field, invalidData) => {});
     });
 
     describe("Name Field", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
