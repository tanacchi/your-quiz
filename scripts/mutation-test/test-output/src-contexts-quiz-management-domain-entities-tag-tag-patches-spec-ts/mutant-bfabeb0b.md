# Mutant bfabeb0b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6598
**Stable ID**: bfabeb0b
**Location**: L281:44–L281:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6598
@@ -277,9 +277,9 @@
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { relatedTags: "string instead of array" },
         { relatedTags: 123 },
-        { relatedTags: { invalidStructure: true } },
+        { relatedTags: { invalidStructure: false } },
       ];
 
       const issues: Issue[] = [
         {
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
