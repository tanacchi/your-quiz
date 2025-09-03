# Mutant d6a3e456 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6770
**Stable ID**: d6a3e456
**Location**: L563:17–L563:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6770
@@ -559,9 +559,9 @@
           message: "Expected array",
         },
         {
           path: ["relatedTags"],
-          code: "custom",
+          code: "",
           message: "Custom validation failed",
         },
         { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
