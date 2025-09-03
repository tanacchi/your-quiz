# Mutant 0b0190bc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5257
**Stable ID**: 0b0190bc
**Location**: L275:10–L275:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5257
@@ -271,9 +271,9 @@
         const result = QuizSummarySchema.safeParse(pendingData);
         expect(result.success).toBe(true);
       });
 
-      it("should accept rejected status without approvedAt", () => {
+      it("", () => {
         const rejectedData = {
           ...validQuizSummaryData,
           status: "rejected" as const,
           approvedAt: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
