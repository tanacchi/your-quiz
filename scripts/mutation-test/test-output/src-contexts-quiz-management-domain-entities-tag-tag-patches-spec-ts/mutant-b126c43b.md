# Mutant b126c43b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6762
**Stable ID**: b126c43b
**Location**: L556:9–L560:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6762
@@ -552,15 +552,11 @@
           path: ["relatedTags"],
           code: "required",
           message: "RelatedTags is required",
         },
+        {},
         {
           path: ["relatedTags"],
-          code: "invalid_type",
-          message: "Expected array",
-        },
-        {
-          path: ["relatedTags"],
           code: "custom",
           message: "Custom validation failed",
         },
         { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
