# Mutant 58c93b53 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3642
**Stable ID**: 58c93b53
**Location**: L359:15–L362:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3642
@@ -355,12 +355,9 @@
         expect(approvedQuiz.get("status")).toBe("approved");
         expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
       });
 
-      it.each([
-        ["approved", "2023-12-01 12:00:00"],
-        ["rejected", undefined],
-      ])("should reject approval for %s status", (status, approvedAt) => {
+      it.each([])("should reject approval for %s status", (status, approvedAt) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
           ...(approvedAt && { approvedAt }),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
