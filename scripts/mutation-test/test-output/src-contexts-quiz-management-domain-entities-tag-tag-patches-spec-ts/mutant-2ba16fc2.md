# Mutant 2ba16fc2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6525
**Stable ID**: 2ba16fc2
**Location**: L170:22–L170:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6525
@@ -166,9 +166,9 @@
       it("should handle multiple related tag issues", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
-          createdBy: "user-456",
+          createdBy: "",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: undefined,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
