# Mutant f9fdf59e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5236
**Stable ID**: f9fdf59e
**Location**: L234:10–L234:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5236
@@ -230,9 +230,9 @@
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Approved Status and ApprovedAt", () => {
-      it("should accept approved status with approvedAt", () => {
+      it("", () => {
         const approvedData = {
           ...validQuizSummaryData,
           status: "approved" as const,
           approvedAt: "2023-12-02 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
