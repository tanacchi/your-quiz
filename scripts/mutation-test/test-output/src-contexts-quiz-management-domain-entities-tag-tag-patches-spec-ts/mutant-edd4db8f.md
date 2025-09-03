# Mutant edd4db8f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6623
**Stable ID**: edd4db8f
**Location**: L317:20–L317:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6623
@@ -313,9 +313,9 @@
       const inputWithoutRelatedTags = {
         id: "tag-123",
         name: "Test Tag",
         createdBy: "user-456",
-        createdAt: "2023-12-01T10:00:00.000Z",
+        createdAt: "",
         // No relatedTags field
       };
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
