# Mutant cda4a850 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6621
**Stable ID**: cda4a850
**Location**: L315:15–L315:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6621
@@ -311,9 +311,9 @@
 
     it("should handle input without relatedTags field", () => {
       const inputWithoutRelatedTags = {
         id: "tag-123",
-        name: "Test Tag",
+        name: "",
         createdBy: "user-456",
         createdAt: "2023-12-01T10:00:00.000Z",
         // No relatedTags field
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
