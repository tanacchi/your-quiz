# Mutant 8849cc8a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 383
**Stable ID**: 8849cc8a
**Location**: L232:23–L232:36

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #383
@@ -228,9 +228,9 @@
         const dataWithExtraField = {
           status: ["approved"],
           limit: 10,
           offset: 0,
-          extraField: "not allowed",
+          extraField: "",
         };
         const result = listQuizzesQuerySchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(true); // schema doesn't use .strict()
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
