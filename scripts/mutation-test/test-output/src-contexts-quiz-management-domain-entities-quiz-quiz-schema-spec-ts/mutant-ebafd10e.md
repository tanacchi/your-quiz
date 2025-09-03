# Mutant ebafd10e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3199
**Stable ID**: ebafd10e
**Location**: L409:10–L409:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3199
@@ -405,9 +405,9 @@
             id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
             value: true,
           },
         ],
-      ])("should accept %s", (_desc, solution) => {
+      ])("", (_desc, solution) => {
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
