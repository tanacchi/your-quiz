# Mutant e43076ae Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6520
**Stable ID**: e43076ae
**Location**: L166:10–L166:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6520
@@ -162,9 +162,9 @@
         const result = suggestTagPatches(input, issues);
         expect(result).toEqual([]);
       });
 
-      it("should handle multiple related tag issues", () => {
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
