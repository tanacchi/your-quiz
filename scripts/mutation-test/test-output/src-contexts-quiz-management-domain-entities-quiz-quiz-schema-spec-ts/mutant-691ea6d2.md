# Mutant 691ea6d2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3098
**Stable ID**: 691ea6d2
**Location**: L277:58–L353:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3098
@@ -273,86 +273,10 @@
       });
     });
   });
 
-  describe("Cross-Field Validation (superRefine)", () => {
-    describe("Approved Status and ApprovedAt", () => {
-      it("should accept approved status with approvedAt", () => {
-        const approvedData = {
-          ...validQuizData,
-          status: "approved" as const,
-          approvedAt: "2023-12-02 10:00:00",
-        };
-        const result = QuizSchema.safeParse(approvedData);
-        expect(result.success).toBe(true);
-      });
+  describe("Cross-Field Validation (superRefine)", () => {});
 
-      it("should reject approved status without approvedAt", () => {
-        const approvedWithoutTimestamp = {
-          ...validQuizData,
-          status: "approved" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSchema.safeParse(approvedWithoutTimestamp);
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
-          ...validQuizData,
-          status: "pending_approval" as const,
-        };
-        const result = QuizSchema.safeParse(pendingData);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("AnswerType and Solution Consistency", () => {
-      it("should accept boolean answerType with BooleanSolution", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject boolean answerType without solution", () => {
-        const dataWithoutSolution = {
-          ...validQuizData,
-          solution: undefined,
-        };
-        const result = QuizSchema.safeParse(dataWithoutSolution);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const solutionError = error.issues.find((issue) =>
-            issue.path.includes("solution"),
-          );
-          expect(solutionError).toBeDefined();
-          expect(solutionError?.message).toContain("expected object");
-        }
-      });
-
-      it("should reject boolean answerType with null solution", () => {
-        const dataWithNullSolution = {
-          ...validQuizData,
-          solution: null,
-        };
-        const result = QuizSchema.safeParse(dataWithNullSolution);
-        expect(result.success).toBe(false);
-      });
-    });
-  });
-
   describe("Edge Cases and Boundary Values", () => {
     describe("Special Characters in Fields", () => {
       it.each([
         ["special characters", "Is <script>alert('xss')</script> valid?"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
