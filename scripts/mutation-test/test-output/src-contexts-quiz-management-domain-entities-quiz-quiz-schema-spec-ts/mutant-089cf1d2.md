# Mutant 089cf1d2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2981
**Stable ID**: 089cf1d2
**Location**: L164:10–L164:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2981
@@ -160,9 +160,9 @@
         ["missing id", { value: true }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
-        ["null solution", null],
+        ["", null],
         ["empty object", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
