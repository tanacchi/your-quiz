# Mutant acb3c30e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6491
**Stable ID**: acb3c30e
**Location**: L126:10–L126:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6491
@@ -122,9 +122,9 @@
         const result = suggestTagPatches(undefined, issues);
         expect(result).toEqual([]);
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
+      it("", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
           createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
