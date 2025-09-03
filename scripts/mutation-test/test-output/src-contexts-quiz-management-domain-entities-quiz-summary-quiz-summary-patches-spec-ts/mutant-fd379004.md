# Mutant fd379004 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4498
**Stable ID**: fd379004
**Location**: L403:53–L403:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4498
@@ -399,9 +399,9 @@
           approvedAt: undefined,
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
