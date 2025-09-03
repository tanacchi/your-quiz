# Mutant 1bea2f54 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2983
**Stable ID**: 1bea2f54
**Location**: L165:10–L165:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2983
@@ -161,9 +161,9 @@
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
-        ["empty object", {}],
+        ["", {}],
       ])("should reject invalid solution: %s", (_desc, solution) => {
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
