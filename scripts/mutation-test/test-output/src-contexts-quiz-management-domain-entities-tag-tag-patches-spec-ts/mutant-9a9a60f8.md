# Mutant 9a9a60f8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6495
**Stable ID**: 9a9a60f8
**Location**: L129:17–L129:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6495
@@ -125,9 +125,9 @@
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
           id: "tag-123",
-          name: "Valid Tag",
+          name: "",
           createdBy: "user-456",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
