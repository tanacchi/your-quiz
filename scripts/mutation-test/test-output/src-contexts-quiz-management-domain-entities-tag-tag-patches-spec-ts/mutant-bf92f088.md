# Mutant bf92f088 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6483
**Stable ID**: bf92f088
**Location**: L118:49–L124:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6483
@@ -114,15 +114,9 @@
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
 
-      it("should handle undefined input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
-        const result = suggestTagPatches(undefined, issues);
-        expect(result).toEqual([]);
-      });
+      it("should handle undefined input", () => {});
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
           id: "tag-123",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
