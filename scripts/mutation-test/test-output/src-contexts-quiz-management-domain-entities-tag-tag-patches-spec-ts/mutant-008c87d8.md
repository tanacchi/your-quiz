# Mutant 008c87d8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6767
**Stable ID**: 008c87d8
**Location**: L561:9–L565:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6767
@@ -557,13 +557,9 @@
           path: ["relatedTags"],
           code: "invalid_type",
           message: "Expected array",
         },
-        {
-          path: ["relatedTags"],
-          code: "custom",
-          message: "Custom validation failed",
-        },
+        {},
         { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
       ];
 
       const patches = suggestTagPatches(input, mixedIssues);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
