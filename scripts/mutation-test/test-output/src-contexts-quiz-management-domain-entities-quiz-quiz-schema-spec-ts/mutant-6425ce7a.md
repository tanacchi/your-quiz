# Mutant 6425ce7a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2947
**Stable ID**: 6425ce7a
**Location**: L138:22–L138:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2947
@@ -134,9 +134,9 @@
         ["invalid_type", "invalid_type"],
         ["", ""],
         [null, null],
       ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
-        const data = { ...validQuizData, answerType };
+        const data = {};
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
