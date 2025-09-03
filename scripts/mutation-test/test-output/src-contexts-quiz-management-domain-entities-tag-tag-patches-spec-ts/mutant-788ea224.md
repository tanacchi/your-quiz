# Mutant 788ea224 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6496
**Stable ID**: 788ea224
**Location**: L130:22–L130:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6496
@@ -126,9 +126,9 @@
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
-          createdBy: "user-456",
+          createdBy: "",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
