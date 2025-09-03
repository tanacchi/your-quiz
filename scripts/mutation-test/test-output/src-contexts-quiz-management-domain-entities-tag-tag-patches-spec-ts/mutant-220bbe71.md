# Mutant 220bbe71 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6753
**Stable ID**: 220bbe71
**Location**: L544:15–L544:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6753
@@ -540,9 +540,9 @@
 
     it("should handle concurrent issue types gracefully", () => {
       const input = {
         id: "tag-concurrent",
-        name: "Concurrent Test",
+        name: "",
         createdBy: "user-concurrent",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
