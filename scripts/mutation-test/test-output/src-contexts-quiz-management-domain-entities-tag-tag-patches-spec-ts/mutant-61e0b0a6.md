# Mutant 61e0b0a6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6771
**Stable ID**: 61e0b0a6
**Location**: L564:20–L564:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6771
@@ -560,9 +560,9 @@
         },
         {
           path: ["relatedTags"],
           code: "custom",
-          message: "Custom validation failed",
+          message: "",
         },
         { path: ["name"], code: "invalid", message: "Invalid name" }, // Should be ignored
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
