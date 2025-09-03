# Mutant bb0140ca Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6164
**Stable ID**: bb0140ca
**Location**: L57:60–L67:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6164
@@ -53,20 +53,10 @@
     });
   });
 
   describe("Entity Creation", () => {
-    it("should create valid tag from complete data", () => {
-      const result = Tag.from(validTagData);
-      expect(result.isOk()).toBe(true);
+    it("should create valid tag from complete data", () => {});
 
-      if (result.isOk()) {
-        const tag = result.value;
-        expect(tag.get("name")).toBe("JavaScript");
-        expect(tag.get("createdBy")).toBe("user-1");
-        expect(tag.get("relatedTags")).toEqual([]);
-      }
-    });
-
     it("should create tag with related tags", () => {
       const tagWithRelations = {
         ...validTagData,
         relatedTags: [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
