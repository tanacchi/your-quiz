# Mutant 0f21dc8c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2212
**Stable ID**: 0f21dc8c
**Location**: L513:20–L513:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2212
@@ -509,9 +509,9 @@
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
