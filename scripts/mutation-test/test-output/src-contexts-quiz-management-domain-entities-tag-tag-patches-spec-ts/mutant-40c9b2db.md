# Mutant 40c9b2db Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6594
**Stable ID**: 40c9b2db
**Location**: L279:24–L279:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6594
@@ -275,9 +275,9 @@
     });
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
-        { relatedTags: "string instead of array" },
+        { relatedTags: "" },
         { relatedTags: 123 },
         { relatedTags: { invalidStructure: true } },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
