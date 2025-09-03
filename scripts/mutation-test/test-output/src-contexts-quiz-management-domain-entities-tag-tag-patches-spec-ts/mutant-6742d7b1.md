# Mutant 6742d7b1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6617
**Stable ID**: 6742d7b1
**Location**: L312:8–L312:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6617
@@ -308,9 +308,9 @@
 
       expect(patched).toEqual(input);
     });
 
-    it("should handle input without relatedTags field", () => {
+    it("", () => {
       const inputWithoutRelatedTags = {
         id: "tag-123",
         name: "Test Tag",
         createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
