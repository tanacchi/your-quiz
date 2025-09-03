# Mutant cff66779 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7313
**Stable ID**: cff66779
**Location**: L517:10–L517:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7313
@@ -513,9 +513,9 @@
       });
     });
 
     describe("Large Related Tags Arrays", () => {
-      it("should handle many related tags", () => {
+      it("", () => {
         const manyRelatedTags = Array.from({ length: 20 }, (_, i) => ({
           relationType: "related" as const,
           id: `tag-${i}`,
           name: `Related Tag ${i}`,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
