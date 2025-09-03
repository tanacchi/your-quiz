# Mutant 4a75098a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6367
**Stable ID**: 4a75098a
**Location**: L13:11–L13:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6367
@@ -9,9 +9,9 @@
 
 describe("Tag Patches", () => {
   const validTagInput: TagInput = {
     id: "tag-123",
-    name: "TypeScript",
+    name: "",
     createdBy: "user-456",
     createdAt: "2023-12-01T10:00:00.000Z",
     relatedTags: [
       {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
