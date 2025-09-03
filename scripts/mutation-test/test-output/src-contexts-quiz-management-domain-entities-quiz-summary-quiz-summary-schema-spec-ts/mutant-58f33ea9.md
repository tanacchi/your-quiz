# Mutant 58f33ea9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5235
**Stable ID**: 58f33ea9
**Location**: L233:54–L284:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5235
@@ -229,61 +229,10 @@
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
-    describe("Approved Status and ApprovedAt", () => {
-      it("should accept approved status with approvedAt", () => {
-        const approvedData = {
-          ...validQuizSummaryData,
-          status: "approved" as const,
-          approvedAt: "2023-12-02 10:00:00",
-        };
-        const result = QuizSummarySchema.safeParse(approvedData);
-        expect(result.success).toBe(true);
-      });
+    describe("Approved Status and ApprovedAt", () => {});
 
-      it("should reject approved status without approvedAt", () => {
-        const approvedWithoutTimestamp = {
-          ...validQuizSummaryData,
-          status: "approved" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(approvedWithoutTimestamp);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const approvedAtError = error.issues.find((issue) =>
-            issue.path.includes("approvedAt"),
-          );
-          expect(approvedAtError).toBeDefined();
-          expect(approvedAtError?.message).toBe(
-            "Approved quiz must have approvedAt timestamp",
-          );
-        }
-      });
-
-      it("should accept non-approved status without approvedAt", () => {
-        const pendingData = {
-          ...validQuizSummaryData,
-          status: "pending_approval" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(pendingData);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept rejected status without approvedAt", () => {
-        const rejectedData = {
-          ...validQuizSummaryData,
-          status: "rejected" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(rejectedData);
-        expect(result.success).toBe(true);
-      });
-    });
-
     describe("Duplicate TagIds Validation", () => {
       it("should accept unique tag IDs", () => {
         const dataWithUniqueTagIds = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
