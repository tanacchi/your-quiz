# Mutant 25f96e28 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7196
**Stable ID**: 25f96e28
**Location**: L369:10–L369:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7196
@@ -365,9 +365,9 @@
         const result = TagSchema.safeParse(dataWithoutSelfReference);
         expect(result.success).toBe(true);
       });
 
-      it("should reject tag that references itself", () => {
+      it("", () => {
         const dataWithSelfReference = {
           ...validTagData,
           id: "tag-self",
           relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
