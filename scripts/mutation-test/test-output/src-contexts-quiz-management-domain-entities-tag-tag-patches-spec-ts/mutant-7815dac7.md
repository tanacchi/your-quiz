# Mutant 7815dac7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6645
**Stable ID**: 7815dac7
**Location**: L343:13–L343:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6645
@@ -339,9 +339,9 @@
         message: `Error ${i}`,
       }));
 
       const input = {
-        id: "tag-123",
+        id: "",
         name: "Test Tag",
         createdBy: "user-456",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
