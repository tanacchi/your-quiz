# Mutant d3af593f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6459
**Stable ID**: d3af593f
**Location**: L94:44–L98:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6459
@@ -90,13 +90,9 @@
         ];
 
         const nonObjectInputs = ["string", 123, true];
 
-        nonObjectInputs.forEach((input) => {
-          const result = suggestTagPatches(input, issues);
-          // Non-object inputs return empty since isObjectLike fails
-          expect(result).toEqual([]);
-        });
+        nonObjectInputs.forEach((input) => {});
       });
 
       it("should handle array input", () => {
         const issues: Issue[] = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
