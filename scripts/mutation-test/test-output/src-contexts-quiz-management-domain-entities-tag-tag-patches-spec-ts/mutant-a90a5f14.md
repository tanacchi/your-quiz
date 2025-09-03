# Mutant a90a5f14 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6585
**Stable ID**: a90a5f14
**Location**: L270:17–L270:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6585
@@ -266,9 +266,9 @@
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestTagPatches(validTagInput, issues);
       expect(result).toEqual([]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
