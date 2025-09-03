# Mutant a8c575ca Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5233
**Stable ID**: a8c575ca
**Location**: L232:58–L334:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5233
@@ -228,112 +228,10 @@
       });
     });
   });
 
-  describe("Cross-Field Validation (superRefine)", () => {
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
+  describe("Cross-Field Validation (superRefine)", () => {});
 
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
-    describe("Duplicate TagIds Validation", () => {
-      it("should accept unique tag IDs", () => {
-        const dataWithUniqueTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-3"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject duplicate tag IDs", () => {
-        const dataWithDuplicateTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const duplicateError = error.issues.find((issue) =>
-            issue.path.includes("tagIds"),
-          );
-          expect(duplicateError).toBeDefined();
-          expect(duplicateError?.message).toBe(
-            "Duplicate tag IDs are not allowed",
-          );
-        }
-      });
-
-      it("should accept empty tag IDs array", () => {
-        const dataWithEmptyTagIds = {
-          ...validQuizSummaryData,
-          tagIds: [],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept single tag ID", () => {
-        const dataWithSingleTagId = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithSingleTagId);
-        expect(result.success).toBe(true);
-      });
-    });
-  });
-
   describe("Edge Cases and Boundary Values", () => {
     describe("Long Strings", () => {
       it("should accept very long question", () => {
         const longQuestion = "A".repeat(1000);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
