# Mutant ae9ef70e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6368
**Stable ID**: ae9ef70e
**Location**: L14:16–L14:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6368
@@ -10,9 +10,9 @@
 describe("Tag Patches", () => {
   const validTagInput: TagInput = {
     id: "tag-123",
     name: "TypeScript",
-    createdBy: "user-456",
+    createdBy: "",
     createdAt: "2023-12-01T10:00:00.000Z",
     relatedTags: [
       {
         relationType: "category",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
