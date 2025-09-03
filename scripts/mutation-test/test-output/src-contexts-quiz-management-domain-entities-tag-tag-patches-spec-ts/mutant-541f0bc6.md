# Mutant 541f0bc6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6754
**Stable ID**: 541f0bc6
**Location**: L545:20–L545:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6754
@@ -541,9 +541,9 @@
     it("should handle concurrent issue types gracefully", () => {
       const input = {
         id: "tag-concurrent",
         name: "Concurrent Test",
-        createdBy: "user-concurrent",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
