# Mutant 50f31d52 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3139
**Stable ID**: 50f31d52
**Location**: L344:10–L344:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3139
@@ -340,9 +340,9 @@
           expect(solutionError?.message).toContain("expected object");
         }
       });
 
-      it("should reject boolean answerType with null solution", () => {
+      it("", () => {
         const dataWithNullSolution = {
           ...validQuizData,
           solution: null,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
