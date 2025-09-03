# Mutant 5df340a9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6509
**Stable ID**: 5df340a9
**Location**: L151:15–L151:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6509
@@ -147,9 +147,9 @@
       });
 
       it("should not suggest patches when field is not in issues", () => {
         const input = {
-          id: "tag-123",
+          id: "",
           name: "Valid Tag",
           createdBy: "user-456",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null, // This would normally trigger a patch
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
