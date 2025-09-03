# Mutant 9c5af5e9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6540
**Stable ID**: 9c5af5e9
**Location**: L194:16–L194:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6540
@@ -190,9 +190,9 @@
         expect(result).toHaveLength(1);
         expect(result).toContainEqual({ relatedTags: [] });
       });
 
-      describe("Integration with applyEntityPatches", () => {
+      describe("", () => {
         it("should apply relatedTags patch correctly", () => {
           const input = {
             id: "tag-123",
             name: "TypeScript",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
