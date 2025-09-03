# Mutant cb35bbed Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6597
**Stable ID**: cb35bbed
**Location**: L281:24–L281:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6597
@@ -277,9 +277,9 @@
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { relatedTags: "string instead of array" },
         { relatedTags: 123 },
-        { relatedTags: { invalidStructure: true } },
+        { relatedTags: {} },
       ];
 
       const issues: Issue[] = [
         {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
