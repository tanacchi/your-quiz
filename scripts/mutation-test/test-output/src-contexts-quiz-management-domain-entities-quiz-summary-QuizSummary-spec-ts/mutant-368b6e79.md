# Mutant 368b6e79 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3379
**Stable ID**: 368b6e79
**Location**: L78:14–L78:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3379
@@ -74,9 +74,9 @@
       expect(entity.get("answerType")).toBe("single_choice");
       expect(entity.get("status")).toBe("pending_approval");
     });
 
-    describe("Invalid field values", () => {
+    describe("", () => {
       it.each([
         [
           "invalid answer type",
           { answerType: "invalid_type" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
