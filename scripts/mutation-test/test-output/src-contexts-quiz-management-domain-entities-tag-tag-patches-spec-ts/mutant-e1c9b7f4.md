# Mutant e1c9b7f4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6449
**Stable ID**: e1c9b7f4
**Location**: L87:66–L99:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6449
@@ -83,22 +83,10 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestTagPatches", () => {
-      it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
+      it("should return empty array for non-object input", () => {});
 
-        const nonObjectInputs = ["string", 123, true];
-
-        nonObjectInputs.forEach((input) => {
-          const result = suggestTagPatches(input, issues);
-          // Non-object inputs return empty since isObjectLike fails
-          expect(result).toEqual([]);
-        });
-      });
-
       it("should handle array input", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
