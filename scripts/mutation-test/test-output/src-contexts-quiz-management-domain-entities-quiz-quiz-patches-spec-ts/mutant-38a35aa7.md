# Mutant 38a35aa7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2518
**Stable ID**: 38a35aa7
**Location**: L827:57–L827:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2518
@@ -823,9 +823,9 @@
       } as const;
 
       const issues: Issue[] = [
         { path: ["id"], code: "invalid", message: "Invalid id" },
-        { path: ["question"], code: "invalid", message: "Invalid question" },
+        { path: ["question"], code: "invalid", message: "" },
         {
           path: ["explanation"],
           code: "invalid",
           message: "Invalid explanation",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
