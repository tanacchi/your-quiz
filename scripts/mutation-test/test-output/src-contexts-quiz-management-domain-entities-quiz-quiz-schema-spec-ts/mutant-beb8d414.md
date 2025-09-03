# Mutant beb8d414 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3127
**Stable ID**: beb8d414
**Location**: L326:10–L326:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3127
@@ -322,9 +322,9 @@
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
       });
 
-      it("should reject boolean answerType without solution", () => {
+      it("", () => {
         const dataWithoutSolution = {
           ...validQuizData,
           solution: undefined,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
