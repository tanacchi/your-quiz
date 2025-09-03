# Mutant cbf085c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3176
**Stable ID**: cbf085c0
**Location**: L388:10–L388:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3176
@@ -384,9 +384,9 @@
         const result = QuizSchema.safeParse(maximalData);
         expect(result.success).toBe(true);
       });
 
-      it("should handle maximum valid explanation length", () => {
+      it("", () => {
         const maxExplanationData = {
           ...validQuizData,
           explanation: "A".repeat(1000), // exactly 1000 characters
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
