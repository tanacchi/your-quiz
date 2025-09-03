# Mutant 0a9c65f4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6620
**Stable ID**: 0a9c65f4
**Location**: L314:13–L314:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6620
@@ -310,9 +310,9 @@
     });
 
     it("should handle input without relatedTags field", () => {
       const inputWithoutRelatedTags = {
-        id: "tag-123",
+        id: "",
         name: "Test Tag",
         createdBy: "user-456",
         createdAt: "2023-12-01T10:00:00.000Z",
         // No relatedTags field
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
