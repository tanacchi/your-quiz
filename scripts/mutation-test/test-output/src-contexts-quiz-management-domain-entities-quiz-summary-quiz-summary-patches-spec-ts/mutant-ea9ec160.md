# Mutant ea9ec160 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4506
**Stable ID**: ea9ec160
**Location**: L406:20–L406:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4506
@@ -402,9 +402,9 @@
         const issues: Issue[] = [
           { path: ["id"], code: "invalid", message: "Invalid id" },
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
-            path: ["explanation"],
+            path: [""],
             code: "invalid",
             message: "Invalid explanation",
           },
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
