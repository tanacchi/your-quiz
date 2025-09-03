# Mutant 8a2ebed7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts
**Mutator**: StringLiteral
**Original ID**: 3273
**Stable ID**: 8a2ebed7
**Location**: L27:15–L27:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.ts	mutated #3273
@@ -23,9 +23,9 @@
   .superRefine((quiz, ctx) => {
     // Approved status must have approvedAt timestamp
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
