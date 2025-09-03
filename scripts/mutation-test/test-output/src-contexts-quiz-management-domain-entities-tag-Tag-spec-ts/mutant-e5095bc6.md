# Mutant e5095bc6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6219
**Stable ID**: e5095bc6
**Location**: L136:58–L164:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6219
@@ -132,38 +132,10 @@
     });
   });
 
   describe("Validation Rules", () => {
-    it("should prevent duplicate related tag IDs", () => {
-      const invalidData = {
-        ...validTagData,
-        relatedTags: [
-          {
-            relationType: "hierarchy" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          },
-          {
-            relationType: "category" as const,
-            id: TagId.parse("tag-2"),
-            name: "Programming",
-          }, // same tag ID
-        ],
-      };
+    it("should prevent duplicate related tag IDs", () => {});
 
-      const result = Tag.from(invalidData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(
-          issues.some((issue) =>
-            issue.message.includes("Duplicate related tag IDs"),
-          ),
-        ).toBe(true);
-      }
-    });
-
     it("should prevent self-reference", () => {
       const selfReferencingData = {
         ...validTagData,
         relatedTags: [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
