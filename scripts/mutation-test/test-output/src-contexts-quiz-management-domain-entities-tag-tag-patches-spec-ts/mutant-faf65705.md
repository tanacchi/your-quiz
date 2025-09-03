# Mutant faf65705 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6542
**Stable ID**: faf65705
**Location**: L195:12–L195:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6542
@@ -191,9 +191,9 @@
         expect(result).toContainEqual({ relatedTags: [] });
       });
 
       describe("Integration with applyEntityPatches", () => {
-        it("should apply relatedTags patch correctly", () => {
+        it("", () => {
           const input = {
             id: "tag-123",
             name: "TypeScript",
             createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
