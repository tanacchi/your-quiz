# Mutant bfd8c2f9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6752
**Stable ID**: bfd8c2f9
**Location**: L543:13–L543:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6752
@@ -539,9 +539,9 @@
     });
 
     it("should handle concurrent issue types gracefully", () => {
       const input = {
-        id: "tag-concurrent",
+        id: "",
         name: "Concurrent Test",
         createdBy: "user-concurrent",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
