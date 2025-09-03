# Mutant 52ba65be Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6546
**Stable ID**: 52ba65be
**Location**: L198:19–L198:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6546
@@ -194,9 +194,9 @@
       describe("Integration with applyEntityPatches", () => {
         it("should apply relatedTags patch correctly", () => {
           const input = {
             id: "tag-123",
-            name: "TypeScript",
+            name: "",
             createdBy: "user-456",
             createdAt: "2023-12-01T10:00:00.000Z",
             relatedTags: null,
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
