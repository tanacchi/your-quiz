# Mutant 8f4c7f6c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6726
**Stable ID**: 8f4c7f6c
**Location**: L476:20–L476:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6726
@@ -472,9 +472,9 @@
     it("should be idempotent - applying patches multiple times should give same result", () => {
       const input = {
         id: "tag-consistency",
         name: "Consistency Test",
-        createdBy: "user-tester",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
