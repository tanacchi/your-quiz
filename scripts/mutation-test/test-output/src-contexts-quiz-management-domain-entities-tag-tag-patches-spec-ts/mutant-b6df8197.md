# Mutant b6df8197 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6581
**Stable ID**: b6df8197
**Location**: L269:17–L269:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6581
@@ -265,9 +265,9 @@
     });
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
         { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestTagPatches(validTagInput, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
