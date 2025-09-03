# Mutant 6a54cdd6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.ts
**Mutator**: StringLiteral
**Original ID**: 7425
**Stable ID**: 6a54cdd6
**Location**: L55:15–L55:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.ts	mutated #7425
@@ -51,9 +51,9 @@
     // Prevent self-reference in related tags
     const selfReferences = tag.relatedTags.filter((rt) => rt.id === tag.id);
     if (selfReferences.length > 0) {
       ctx.addIssue({
-        code: "custom",
+        code: "",
         message: "Tag cannot reference itself in related tags",
         path: ["relatedTags"],
       });
     }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
