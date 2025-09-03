# Mutant 7606fb6e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6476
**Stable ID**: 7606fb6e
**Location**: L112:11–L112:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6476
@@ -108,9 +108,9 @@
       });
 
       it("should handle null input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          {},
         ];
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
