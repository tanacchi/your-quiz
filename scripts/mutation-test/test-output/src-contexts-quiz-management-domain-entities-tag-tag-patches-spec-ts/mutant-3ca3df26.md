# Mutant 3ca3df26 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6523
**Stable ID**: 3ca3df26
**Location**: L168:15–L168:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6523
@@ -164,9 +164,9 @@
       });
 
       it("should handle multiple related tag issues", () => {
         const input = {
-          id: "tag-123",
+          id: "",
           name: "Valid Tag",
           createdBy: "user-456",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
