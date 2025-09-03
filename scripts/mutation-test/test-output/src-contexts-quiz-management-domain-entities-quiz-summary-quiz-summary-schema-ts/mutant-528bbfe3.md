# Mutant 528bbfe3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.ts
**Mutator**: StringLiteral
**Original ID**: 5421
**Stable ID**: 528bbfe3
**Location**: L53:15–L53:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.ts	mutated #5421
@@ -49,9 +49,9 @@
   .superRefine((quiz, ctx) => {
     // Cross-field constraint: approved quiz must have approvedAt
     if (quiz.status === "approved" && !quiz.approvedAt) {
       ctx.addIssue({
-        code: "custom",
+        code: "",
         message: "Approved quiz must have approvedAt timestamp",
         path: ["approvedAt"],
       });
     }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
