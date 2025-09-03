# Mutant c5ae9f77 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2158
**Stable ID**: c5ae9f77
**Location**: L471:19–L471:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2158
@@ -467,9 +467,9 @@
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
             path: ["answerType"],
-            code: "invalid",
+            code: "",
             message: "Invalid answerType",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
