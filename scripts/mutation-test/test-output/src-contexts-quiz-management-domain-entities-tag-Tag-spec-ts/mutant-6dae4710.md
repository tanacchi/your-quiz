# Mutant 6dae4710 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6175
**Stable ID**: 6dae4710
**Location**: L69:8–L69:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6175
@@ -65,9 +65,9 @@
         expect(tag.get("relatedTags")).toEqual([]);
       }
     });
 
-    it("should create tag with related tags", () => {
+    it("", () => {
       const tagWithRelations = {
         ...validTagData,
         relatedTags: [
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
