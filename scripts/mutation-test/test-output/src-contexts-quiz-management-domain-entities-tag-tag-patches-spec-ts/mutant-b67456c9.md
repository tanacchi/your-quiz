# Mutant b67456c9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6588
**Stable ID**: b67456c9
**Location**: L270:63–L270:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6588
@@ -266,9 +266,9 @@
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
+        { path: ["relatedTags", 1], code: "invalid", message: "" },
       ];
 
       const result = suggestTagPatches(validTagInput, issues);
       expect(result).toEqual([]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
