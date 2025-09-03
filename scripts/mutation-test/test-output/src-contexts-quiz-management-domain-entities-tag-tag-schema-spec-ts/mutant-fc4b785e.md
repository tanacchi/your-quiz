# Mutant fc4b785e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7228
**Stable ID**: fc4b785e
**Location**: L422:10–L422:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7228
@@ -418,9 +418,9 @@
         const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
         expect(result.success).toBe(false);
       });
 
-      it("should handle empty related tags without error", () => {
+      it("", () => {
         const dataWithEmptyRelatedTags = {
           ...validTagData,
           id: "tag-lonely",
           relatedTags: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
