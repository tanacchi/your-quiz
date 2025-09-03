# Mutant 966b1e93 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6524
**Stable ID**: 966b1e93
**Location**: L169:17–L169:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6524
@@ -165,9 +165,9 @@
 
       it("should handle multiple related tag issues", () => {
         const input = {
           id: "tag-123",
-          name: "Valid Tag",
+          name: "",
           createdBy: "user-456",
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: undefined,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
