# Mutant dcde89b5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6749
**Stable ID**: dcde89b5
**Location**: L541:8–L541:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6749
@@ -537,9 +537,9 @@
       expect(patchedInput.relatedTags).toEqual([]);
       expect(patchedInput.relatedTags).not.toBe(originalInput.relatedTags);
     });
 
-    it("should handle concurrent issue types gracefully", () => {
+    it("", () => {
       const input = {
         id: "tag-concurrent",
         name: "Concurrent Test",
         createdBy: "user-concurrent",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
