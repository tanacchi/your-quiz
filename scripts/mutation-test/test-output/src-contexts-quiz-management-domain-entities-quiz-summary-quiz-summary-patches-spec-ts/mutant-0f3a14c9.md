# Mutant 0f3a14c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4503
**Stable ID**: 0f3a14c9
**Location**: L404:59–L404:77

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4503
@@ -400,9 +400,9 @@
         };
 
         const issues: Issue[] = [
           { path: ["id"], code: "invalid", message: "Invalid id" },
-          { path: ["question"], code: "invalid", message: "Invalid question" },
+          { path: ["question"], code: "invalid", message: "" },
           {
             path: ["explanation"],
             code: "invalid",
             message: "Invalid explanation",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
