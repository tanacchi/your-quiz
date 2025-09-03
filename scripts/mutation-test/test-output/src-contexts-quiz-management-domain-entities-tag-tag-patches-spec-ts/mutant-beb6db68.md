# Mutant beb6db68 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6768
**Stable ID**: beb6db68
**Location**: L562:17–L562:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6768
@@ -558,9 +558,9 @@
           code: "invalid_type",
           message: "Expected array",
         },
         {
-          path: ["relatedTags"],
+          path: [],
           code: "custom",
           message: "Custom validation failed",
         },
         { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
