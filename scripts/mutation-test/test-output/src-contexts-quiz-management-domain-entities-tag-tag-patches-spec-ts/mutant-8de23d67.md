# Mutant 8de23d67 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6741
**Stable ID**: 8de23d67
**Location**: L512:20–L512:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6741
@@ -508,9 +508,9 @@
       const originalInput = {
         id: "tag-integrity",
         name: "Integrity Test",
         createdBy: "user-integrity",
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
