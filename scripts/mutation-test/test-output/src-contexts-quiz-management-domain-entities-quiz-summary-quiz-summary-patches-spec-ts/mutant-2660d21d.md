# Mutant 2660d21d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4609
**Stable ID**: 2660d21d
**Location**: L486:24–L486:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4609
@@ -482,9 +482,9 @@
             },
             {
               path: ["answerType"],
               code: "invalid",
-              message: "Invalid answerType",
+              message: "",
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
             { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
