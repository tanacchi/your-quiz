# Mutant 042a41ab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4695
**Stable ID**: 042a41ab
**Location**: L601:57–L601:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4695
@@ -597,9 +597,9 @@
         { id: [], solutionId: {}, creatorId: true },
       ];
 
       const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
+        { path: ["question"], code: "invalid", message: "" },
         { path: ["answerType"], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
