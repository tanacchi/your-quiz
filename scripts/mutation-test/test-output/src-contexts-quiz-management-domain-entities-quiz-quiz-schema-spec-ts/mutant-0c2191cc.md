# Mutant 0c2191cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2919
**Stable ID**: 0c2191cc
**Location**: L120:14–L120:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2919
@@ -116,9 +116,9 @@
         }
       });
     });
 
-    describe("AnswerType Field", () => {
+    describe("", () => {
       it("should only accept 'boolean' as answerType", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
