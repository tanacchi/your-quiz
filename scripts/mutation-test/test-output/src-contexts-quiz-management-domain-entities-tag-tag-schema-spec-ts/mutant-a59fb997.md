# Mutant a59fb997 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7311
**Stable ID**: a59fb997
**Location**: L516:14–L516:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7311
@@ -512,9 +512,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Large Related Tags Arrays", () => {
+    describe("", () => {
       it("should handle many related tags", () => {
         const manyRelatedTags = Array.from({ length: 20 }, (_, i) => ({
           relationType: "related" as const,
           id: `tag-${i}`,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
