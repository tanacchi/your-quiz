# Mutant 8b4e80c2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3123
**Stable ID**: 8b4e80c2
**Location**: L320:59–L352:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3123
@@ -316,41 +316,9 @@
         expect(result.success).toBe(true);
       });
     });
 
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
+    describe("AnswerType and Solution Consistency", () => {});
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Special Characters in Fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
