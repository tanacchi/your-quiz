# Mutant cc6578ca Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6494
**Stable ID**: cc6578ca
**Location**: L128:15–L128:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6494
@@ -124,9 +124,9 @@
       });
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
-          id: "tag-123",
+          id: "",
           name: "Valid Tag",
           createdBy: "user-456",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
