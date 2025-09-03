# Mutant eb14372c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6521
**Stable ID**: eb14372c
**Location**: L166:61–L192:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6521
@@ -162,36 +162,10 @@
         const result = suggestTagPatches(input, issues);
         expect(result).toEqual([]);
       });
 
-      it("should handle multiple related tag issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: undefined,
-        };
+      it("should handle multiple related tag issues", () => {});
 
-        const issues: Issue[] = [
-          {
-            path: ["relatedTags"],
-            code: "invalid",
-            message: "Invalid relatedTags",
-          },
-          {
-            path: ["relatedTags", 0],
-            code: "invalid",
-            message: "Invalid related tag",
-          },
-        ];
-
-        const result = suggestTagPatches(input, issues);
-
-        expect(result).toHaveLength(1);
-        expect(result).toContainEqual({ relatedTags: [] });
-      });
-
       describe("Integration with applyEntityPatches", () => {
         it("should apply relatedTags patch correctly", () => {
           const input = {
             id: "tag-123",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
