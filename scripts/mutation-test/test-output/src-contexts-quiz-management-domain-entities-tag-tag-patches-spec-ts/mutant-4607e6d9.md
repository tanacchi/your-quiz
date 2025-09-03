# Mutant 4607e6d9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6507
**Stable ID**: 4607e6d9
**Location**: L149:74–L164:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6507
@@ -145,25 +145,10 @@
         expect(result).toHaveLength(1);
         expect(result).toContainEqual({ relatedTags: [] });
       });
 
-      it("should not suggest patches when field is not in issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: null, // This would normally trigger a patch
-        };
+      it("should not suggest patches when field is not in issues", () => {});
 
-        const issues: Issue[] = [
-          { path: ["name"], code: "invalid", message: "Invalid name" }, // Different field
-        ];
-
-        const result = suggestTagPatches(input, issues);
-        expect(result).toEqual([]);
-      });
-
       it("should handle multiple related tag issues", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
