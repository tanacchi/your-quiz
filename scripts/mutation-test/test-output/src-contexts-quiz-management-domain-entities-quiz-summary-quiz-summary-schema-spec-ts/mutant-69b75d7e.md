# Mutant 69b75d7e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5237
**Stable ID**: 69b75d7e
**Location**: L234:65–L242:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5237
@@ -230,17 +230,9 @@
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Approved Status and ApprovedAt", () => {
-      it("should accept approved status with approvedAt", () => {
-        const approvedData = {
-          ...validQuizSummaryData,
-          status: "approved" as const,
-          approvedAt: "2023-12-02 10:00:00",
-        };
-        const result = QuizSummarySchema.safeParse(approvedData);
-        expect(result.success).toBe(true);
-      });
+      it("should accept approved status with approvedAt", () => {});
 
       it("should reject approved status without approvedAt", () => {
         const approvedWithoutTimestamp = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
