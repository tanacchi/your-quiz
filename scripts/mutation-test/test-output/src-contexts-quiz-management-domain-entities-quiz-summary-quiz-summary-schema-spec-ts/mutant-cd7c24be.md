# Mutant cd7c24be Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5234
**Stable ID**: cd7c24be
**Location**: L233:14–L233:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5234
@@ -229,9 +229,9 @@
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
-    describe("Approved Status and ApprovedAt", () => {
+    describe("", () => {
       it("should accept approved status with approvedAt", () => {
         const approvedData = {
           ...validQuizSummaryData,
           status: "approved" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
