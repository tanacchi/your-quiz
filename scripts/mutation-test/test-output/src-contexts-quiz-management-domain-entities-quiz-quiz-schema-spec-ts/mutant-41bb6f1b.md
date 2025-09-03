# Mutant 41bb6f1b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3129
**Stable ID**: 41bb6f1b
**Location**: L327:37–L330:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3129
@@ -323,12 +323,9 @@
         expect(result.success).toBe(true);
       });
 
       it("should reject boolean answerType without solution", () => {
-        const dataWithoutSolution = {
-          ...validQuizData,
-          solution: undefined,
-        };
+        const dataWithoutSolution = {};
         const result = QuizSchema.safeParse(dataWithoutSolution);
         expect(result.success).toBe(false);
 
         if (!result.success) {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
