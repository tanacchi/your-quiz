# Mutant b0da9ea1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7152
**Stable ID**: b0da9ea1
**Location**: L295:10–L295:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7152
@@ -291,9 +291,9 @@
         const result = TagSchema.safeParse(dataWithUniqueRelatedTagIds);
         expect(result.success).toBe(true);
       });
 
-      it("should reject duplicate related tag IDs", () => {
+      it("", () => {
         const dataWithDuplicateRelatedTagIds = {
           ...validTagData,
           relatedTags: [
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
