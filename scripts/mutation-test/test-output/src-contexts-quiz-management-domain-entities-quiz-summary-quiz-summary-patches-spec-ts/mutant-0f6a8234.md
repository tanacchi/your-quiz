# Mutant 0f6a8234 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4537
**Stable ID**: 0f6a8234
**Location**: L429:19–L429:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4537
@@ -425,9 +425,9 @@
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
             path: ["approvedAt"],
-            code: "invalid",
+            code: "",
             message: "Invalid approvedAt",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
