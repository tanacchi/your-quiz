# Mutant 33fb67ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2910
**Stable ID**: 33fb67ed
**Location**: L106:10–L106:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2910
@@ -102,9 +102,9 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
 
-      it("should trim whitespace from question", () => {
+      it("", () => {
         const dataWithWhitespace = {
           ...validQuizData,
           question: "  Valid question  ",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
