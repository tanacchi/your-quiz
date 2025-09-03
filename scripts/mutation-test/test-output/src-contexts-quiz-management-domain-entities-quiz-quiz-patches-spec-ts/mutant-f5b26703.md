# Mutant f5b26703 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2204
**Stable ID**: f5b26703
**Location**: L510:53–L510:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2204
@@ -506,9 +506,9 @@
           solution: null,
         };
 
         const issues: Issue[] = [
-          { path: ["id"], code: "invalid", message: "Invalid id" },
+          { path: ["id"], code: "invalid", message: "" },
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
             path: ["explanation"],
             code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
