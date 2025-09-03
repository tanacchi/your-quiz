# Mutant ee1f2747 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6647
**Stable ID**: ee1f2747
**Location**: L345:20–L345:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6647
@@ -341,9 +341,9 @@
 
       const input = {
         id: "tag-123",
         name: "Test Tag",
-        createdBy: "user-456",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
