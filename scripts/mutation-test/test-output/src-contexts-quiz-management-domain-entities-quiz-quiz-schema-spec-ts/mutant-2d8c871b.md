# Mutant 2d8c871b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2905
**Stable ID**: 2d8c871b
**Location**: L99:10–L99:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2905
@@ -95,9 +95,9 @@
         ["exactly 500 chars", "A".repeat(500), true],
         ["empty string", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
-        ["null value", null, false],
+        ["", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
