# Mutant 714c0a02 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6636
**Stable ID**: 714c0a02
**Location**: L335:66–L354:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6636
@@ -331,29 +331,10 @@
     });
   });
 
   describe("Performance and Large Data Handling", () => {
-    it("should handle large number of issues efficiently", () => {
-      const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
-        path: ["relatedTags"],
-        code: `error-${i}`,
-        message: `Error ${i}`,
-      }));
+    it("should handle large number of issues efficiently", () => {});
 
-      const input = {
-        id: "tag-123",
-        name: "Test Tag",
-        createdBy: "user-456",
-        createdAt: "2023-12-01T10:00:00.000Z",
-        relatedTags: null,
-      };
-
-      const result = suggestTagPatches(input, largeIssues);
-
-      expect(result).toHaveLength(1);
-      expect(result[0]).toEqual({ relatedTags: [] });
-    });
-
     it("should handle repeated patch applications", () => {
       let currentInput = {
         id: "tag-123",
         name: "Test Tag",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
