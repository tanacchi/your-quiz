# Mutant c02f22bf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6369
**Stable ID**: c02f22bf
**Location**: L15:16–L15:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6369
@@ -11,9 +11,9 @@
   const validTagInput: TagInput = {
     id: "tag-123",
     name: "TypeScript",
     createdBy: "user-456",
-    createdAt: "2023-12-01T10:00:00.000Z",
+    createdAt: "",
     relatedTags: [
       {
         relationType: "category",
         id: "tag-789",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
