# Mutant 16b7e12b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7036
**Stable ID**: 16b7e12b
**Location**: L194:17–L208:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7036
@@ -190,23 +190,9 @@
         }
       });
 
       describe("Related Tag Object Validation", () => {
-        it.each([
-          ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
-          ["missing name", { relationType: "category", id: "tag-1" }],
-          [
-            "invalid relationType",
-            { relationType: "invalid", id: "tag-1", name: "Test" },
-          ],
-          ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
-          [
-            "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
-          ],
-        ])(
+        it.each([])(
           "should reject invalid related tag: %s",
           (_desc, invalidRelatedTag) => {
             const dataWithInvalidRelatedTag = {
               ...validTagData,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
