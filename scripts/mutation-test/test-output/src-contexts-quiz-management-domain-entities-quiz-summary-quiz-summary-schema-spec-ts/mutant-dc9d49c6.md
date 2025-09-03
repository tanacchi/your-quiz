# Mutant dc9d49c6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5253
**Stable ID**: dc9d49c6
**Location**: L265:10–L265:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5253
@@ -261,9 +261,9 @@
           );
         }
       });
 
-      it("should accept non-approved status without approvedAt", () => {
+      it("", () => {
         const pendingData = {
           ...validQuizSummaryData,
           status: "pending_approval" as const,
           approvedAt: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
