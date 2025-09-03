# Mutant f9c7f180 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2907
**Stable ID**: f9c7f180
**Location**: L100:10–L100:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2907
@@ -96,9 +96,9 @@
         ["empty string", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
         ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
+      ])("", (_desc, question, isValid) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
