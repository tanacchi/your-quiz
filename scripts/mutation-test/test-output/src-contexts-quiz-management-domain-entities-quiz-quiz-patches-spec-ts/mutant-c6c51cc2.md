# Mutant c6c51cc2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2209
**Stable ID**: c6c51cc2
**Location**: L511:59–L511:77

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2209
@@ -507,9 +507,9 @@
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
