# Mutant 09dadbc7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6727
**Stable ID**: 09dadbc7
**Location**: L477:20–L477:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6727
@@ -473,9 +473,9 @@
       const input = {
         id: "tag-consistency",
         name: "Consistency Test",
         createdBy: "user-tester",
-        createdAt: "2023-12-01T10:00:00.000Z",
+        createdAt: "",
         relatedTags: null,
       };
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
