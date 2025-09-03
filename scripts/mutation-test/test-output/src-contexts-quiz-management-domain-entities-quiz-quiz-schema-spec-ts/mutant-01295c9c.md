# Mutant 01295c9c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2988
**Stable ID**: 01295c9c
**Location**: L172:10–L172:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2988
@@ -168,9 +168,9 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
 
-      it("should validate solution as BooleanSolution union", () => {
+      it("", () => {
         const solutionValidation =
           BooleanSolutionSchema.safeParse(validBooleanSolution);
         expect(solutionValidation.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
