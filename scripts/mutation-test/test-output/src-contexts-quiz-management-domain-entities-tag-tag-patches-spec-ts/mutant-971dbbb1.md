# Mutant 971dbbb1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6492
**Stable ID**: 971dbbb1
**Location**: L126:78–L147:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6492
@@ -122,31 +122,10 @@
         const result = suggestTagPatches(undefined, issues);
         expect(result).toEqual([]);
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: null,
-        };
+      it("should only suggest patches for fields mentioned in issues", () => {});
 
-        const issues: Issue[] = [
-          {
-            path: ["relatedTags"],
-            code: "invalid",
-            message: "Invalid relatedTags",
-          },
-        ];
-
-        const result = suggestTagPatches(input, issues);
-
-        expect(result).toHaveLength(1);
-        expect(result).toContainEqual({ relatedTags: [] });
-      });
-
       it("should not suggest patches when field is not in issues", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
