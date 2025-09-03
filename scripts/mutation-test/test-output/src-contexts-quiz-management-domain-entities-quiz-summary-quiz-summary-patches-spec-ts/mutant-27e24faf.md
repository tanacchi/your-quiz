# Mutant 27e24faf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4473
**Stable ID**: 27e24faf
**Location**: L376:19–L376:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4473
@@ -372,9 +372,9 @@
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
