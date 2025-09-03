# Mutant e732777a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6506
**Stable ID**: e732777a
**Location**: L149:10–L149:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6506
@@ -145,9 +145,9 @@
         expect(result).toHaveLength(1);
         expect(result).toContainEqual({ relatedTags: [] });
       });
 
-      it("should not suggest patches when field is not in issues", () => {
+      it("", () => {
         const input = {
           id: "tag-123",
           name: "Valid Tag",
           createdBy: "user-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
