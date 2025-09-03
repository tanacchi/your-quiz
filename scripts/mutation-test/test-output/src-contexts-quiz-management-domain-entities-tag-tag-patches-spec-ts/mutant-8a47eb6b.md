# Mutant 8a47eb6b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6577
**Stable ID**: 8a47eb6b
**Location**: L267:8–L267:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6577
@@ -263,9 +263,9 @@
       const result = suggestTagPatches(validTagInput, []);
       expect(result).toEqual([]);
     });
 
-    it("should handle issues with non-string paths", () => {
+    it("", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
         { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
