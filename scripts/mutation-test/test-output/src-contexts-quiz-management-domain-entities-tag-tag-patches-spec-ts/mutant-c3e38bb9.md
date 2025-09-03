# Mutant c3e38bb9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6695
**Stable ID**: c3e38bb9
**Location**: L421:20–L421:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6695
@@ -417,9 +417,9 @@
       const dbTagInput = {
         id: "tag-from-db",
         name: "Database Tag",
         createdBy: "user-db",
-        createdAt: "2023-12-01T10:00:00.000Z",
+        createdAt: "",
         relatedTags: null, // Common when field is nullable in database
       };
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
