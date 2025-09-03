# Mutant e4b64247 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5232
**Stable ID**: e4b64247
**Location**: L232:12–L232:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5232
@@ -228,9 +228,9 @@
       });
     });
   });
 
-  describe("Cross-Field Validation (superRefine)", () => {
+  describe("", () => {
     describe("Approved Status and ApprovedAt", () => {
       it("should accept approved status with approvedAt", () => {
         const approvedData = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
