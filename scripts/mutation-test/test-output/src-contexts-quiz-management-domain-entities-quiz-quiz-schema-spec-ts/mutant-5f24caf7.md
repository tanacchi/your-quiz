# Mutant 5f24caf7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2999
**Stable ID**: 5f24caf7
**Location**: L192:10–L192:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2999
@@ -188,9 +188,9 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should accept quiz without explanation", () => {
+      it("", () => {
         const { explanation: _explanation, ...dataWithoutExplanation } =
           validQuizData;
         const result = QuizSchema.safeParse(dataWithoutExplanation);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
