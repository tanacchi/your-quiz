# Mutant 379e28ae Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6755
**Stable ID**: 379e28ae
**Location**: L546:20–L546:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6755
@@ -542,9 +542,9 @@
       const input = {
         id: "tag-concurrent",
         name: "Concurrent Test",
         createdBy: "user-concurrent",
-        createdAt: "2023-12-01T10:00:00.000Z",
+        createdAt: "",
         relatedTags: null,
       };
 
       const mixedIssues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
