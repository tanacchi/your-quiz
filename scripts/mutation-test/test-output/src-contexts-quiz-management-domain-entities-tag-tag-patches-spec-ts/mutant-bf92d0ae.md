# Mutant bf92d0ae Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6436
**Stable ID**: bf92d0ae
**Location**: L68:12–L68:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6436
@@ -64,9 +64,9 @@
 
           expect(patched.relatedTags).toEqual([]);
         });
 
-        it("should not modify valid relatedTags", () => {
+        it("", () => {
           const validRelatedTags = [
             {
               relationType: "synonym" as const,
               id: "tag-syn",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
