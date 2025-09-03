# Mutant 069fd0e7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.ts
**Mutator**: StringLiteral
**Original ID**: 7410
**Stable ID**: 069fd0e7
**Location**: L45:15–L45:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.ts	mutated #7410
@@ -41,9 +41,9 @@
     const relatedTagIds = tag.relatedTags.map((rt) => rt.id);
     const uniqueTagIds = new Set(relatedTagIds);
     if (uniqueTagIds.size !== relatedTagIds.length) {
       ctx.addIssue({
-        code: "custom",
+        code: "",
         message: "Duplicate related tag IDs are not allowed",
         path: ["relatedTags"],
       });
     }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
