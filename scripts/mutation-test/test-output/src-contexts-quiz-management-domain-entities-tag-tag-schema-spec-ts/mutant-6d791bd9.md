# Mutant 6d791bd9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7132
**Stable ID**: 6d791bd9
**Location**: L260:23–L260:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7132
@@ -256,9 +256,9 @@
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validTagData,
-          extraField: "not allowed",
+          extraField: "",
         };
         const result = TagSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
