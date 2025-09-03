# Mutant cd966a23 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6773
**Stable ID**: cd966a23
**Location**: L566:17–L566:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6773
@@ -562,9 +562,9 @@
           path: ["relatedTags"],
           code: "custom",
           message: "Custom validation failed",
         },
-        { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
+        { path: [], code: "invalid", message: "Invalid name" }, // Should be ignored
       ];
 
       const patches = suggestTagPatches(input, mixedIssues);
       const patchedInput: TagInput = applyEntityPatches<TagInput>(
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
