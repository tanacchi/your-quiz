# Mutant e7ab05e1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3171
**Stable ID**: e7ab05e1
**Location**: L379:10–L379:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3171
@@ -375,9 +375,9 @@
         const result = QuizSchema.safeParse(minimalData);
         expect(result.success).toBe(true);
       });
 
-      it("should handle maximum valid question length", () => {
+      it("", () => {
         const maximalData = {
           ...validQuizData,
           question: "A".repeat(500), // exactly 500 characters
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
