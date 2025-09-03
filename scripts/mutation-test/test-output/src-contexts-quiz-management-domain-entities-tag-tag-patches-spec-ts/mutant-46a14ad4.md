# Mutant 46a14ad4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6583
**Stable ID**: 46a14ad4
**Location**: L269:48–L269:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6583
@@ -265,9 +265,9 @@
     });
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
+        { path: [0], code: "invalid", message: "" },
         { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestTagPatches(validTagInput, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
