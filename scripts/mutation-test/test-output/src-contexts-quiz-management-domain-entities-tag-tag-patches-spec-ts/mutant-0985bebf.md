# Mutant 0985bebf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6622
**Stable ID**: 0985bebf
**Location**: L316:20–L316:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6622
@@ -312,9 +312,9 @@
     it("should handle input without relatedTags field", () => {
       const inputWithoutRelatedTags = {
         id: "tag-123",
         name: "Test Tag",
-        createdBy: "user-456",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         // No relatedTags field
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
