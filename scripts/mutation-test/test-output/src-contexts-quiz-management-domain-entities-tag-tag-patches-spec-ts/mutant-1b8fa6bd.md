# Mutant 1b8fa6bd Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6740
**Stable ID**: 1b8fa6bd
**Location**: L511:20–L511:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6740
@@ -507,9 +507,9 @@
     it("should maintain referential integrity of non-patched fields", () => {
       const originalInput = {
         id: "tag-integrity",
         name: "Integrity Test",
-        createdBy: "user-integrity",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
