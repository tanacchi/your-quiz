# Mutant 17d5b035 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2950
**Stable ID**: 17d5b035
**Location**: L144:38–L180:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2950
@@ -140,46 +140,10 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Solution Field", () => {
-      it("should accept valid BooleanSolution", () => {
-        const validSolution = {
-          id: "solution-456",
-          value: false,
-        };
-        const data = { ...validQuizData, solution: validSolution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
+    describe("Solution Field", () => {});
 
-        if (result.success) {
-          expect(result.data.solution).toEqual(validSolution);
-        }
-      });
-
-      it.each([
-        ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
-        ["invalid value type", { id: "solution-123", value: "true" }],
-        ["null solution", null],
-        ["empty object", {}],
-      ])("should reject invalid solution: %s", (_desc, solution) => {
-        const data = { ...validQuizData, solution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-
-      it("should validate solution as BooleanSolution union", () => {
-        const solutionValidation =
-          BooleanSolutionSchema.safeParse(validBooleanSolution);
-        expect(solutionValidation.success).toBe(true);
-
-        const quizValidation = QuizSchema.safeParse(validQuizData);
-        expect(quizValidation.success).toBe(true);
-      });
-    });
-
     describe("Explanation Field", () => {
       it("should accept valid explanation", () => {
         const data = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
