# Mutant 25b81ca5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2985
**Stable ID**: 25b81ca5
**Location**: L166:69–L170:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2985
@@ -162,13 +162,9 @@
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
-      ])("should reject invalid solution: %s", (_desc, solution) => {
-        const data = { ...validQuizData, solution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
+      ])("should reject invalid solution: %s", (_desc, solution) => {});
 
       it("should validate solution as BooleanSolution union", () => {
         const solutionValidation =
           BooleanSolutionSchema.safeParse(validBooleanSolution);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
