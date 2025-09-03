# Mutant ffb808a6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3435
**Stable ID**: ffb808a6
**Location**: L146:14–L146:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3435
@@ -142,9 +142,9 @@
         );
       });
     });
 
-    describe("Business rule validations", () => {
+    describe("", () => {
       it.each([
         [
           "approved quiz must have approvedAt",
           { status: "approved", approvedAt: undefined },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
