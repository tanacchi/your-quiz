# Mutant ac4750df Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6475
**Stable ID**: ac4750df
**Location**: L111:33–L113:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6475
@@ -107,11 +107,9 @@
         expect(result).toEqual([{ relatedTags: [] }]);
       });
 
       it("should handle null input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
+        const issues: Issue[] = [];
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
