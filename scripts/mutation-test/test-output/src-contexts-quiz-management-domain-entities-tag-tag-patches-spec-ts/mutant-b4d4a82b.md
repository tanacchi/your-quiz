# Mutant b4d4a82b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6511
**Stable ID**: b4d4a82b
**Location**: L153:22–L153:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6511
@@ -149,9 +149,9 @@
       it("should not suggest patches when field is not in issues", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
-          createdBy: "user-456",
+          createdBy: "",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null, // This would normally trigger a patch
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
