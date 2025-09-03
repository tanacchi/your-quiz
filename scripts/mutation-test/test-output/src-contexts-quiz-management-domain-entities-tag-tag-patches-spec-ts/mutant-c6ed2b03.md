# Mutant c6ed2b03 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6590
**Stable ID**: c6ed2b03
**Location**: L277:8–L277:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6590
@@ -273,9 +273,9 @@
       const result = suggestTagPatches(validTagInput, issues);
       expect(result).toEqual([]);
     });
 
-    it("should handle malformed input objects", () => {
+    it("", () => {
       const malformedInputs = [
         { relatedTags: "string instead of array" },
         { relatedTags: 123 },
         { relatedTags: { invalidStructure: true } },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
