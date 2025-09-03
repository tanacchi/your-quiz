# Mutant b1c96310 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6547
**Stable ID**: b1c96310
**Location**: L199:24–L199:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6547
@@ -195,9 +195,9 @@
         it("should apply relatedTags patch correctly", () => {
           const input = {
             id: "tag-123",
             name: "TypeScript",
-            createdBy: "user-456",
+            createdBy: "",
             createdAt: "2023-12-01T10:00:00.000Z",
             relatedTags: null,
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
