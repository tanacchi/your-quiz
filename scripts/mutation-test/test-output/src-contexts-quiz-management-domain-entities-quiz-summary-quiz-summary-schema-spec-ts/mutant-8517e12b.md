# Mutant 8517e12b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5242
**Stable ID**: 8517e12b
**Location**: L244:68–L263:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5242
@@ -240,29 +240,10 @@
         const result = QuizSummarySchema.safeParse(approvedData);
         expect(result.success).toBe(true);
       });
 
-      it("should reject approved status without approvedAt", () => {
-        const approvedWithoutTimestamp = {
-          ...validQuizSummaryData,
-          status: "approved" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(approvedWithoutTimestamp);
-        expect(result.success).toBe(false);
+      it("should reject approved status without approvedAt", () => {});
 
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
       it("should accept non-approved status without approvedAt", () => {
         const pendingData = {
           ...validQuizSummaryData,
           status: "pending_approval" as const,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
