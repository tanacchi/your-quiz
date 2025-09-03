# Mutant a544ab23 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6592
**Stable ID**: a544ab23
**Location**: L278:31–L282:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6592
@@ -274,13 +274,9 @@
       expect(result).toEqual([]);
     });
 
     it("should handle malformed input objects", () => {
-      const malformedInputs = [
-        { relatedTags: "string instead of array" },
-        { relatedTags: 123 },
-        { relatedTags: { invalidStructure: true } },
-      ];
+      const malformedInputs = [];
 
       const issues: Issue[] = [
         {
           path: ["relatedTags"],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
