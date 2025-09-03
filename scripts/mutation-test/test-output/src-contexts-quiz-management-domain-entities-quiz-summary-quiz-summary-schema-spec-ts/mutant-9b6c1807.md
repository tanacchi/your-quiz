# Mutant 9b6c1807 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5202
**Stable ID**: 9b6c1807
**Location**: L185:26–L185:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5202
@@ -181,9 +181,9 @@
         ["pending_approval", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null value", null, false],
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizSummaryData, status };
         const result = QuizSummarySchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
