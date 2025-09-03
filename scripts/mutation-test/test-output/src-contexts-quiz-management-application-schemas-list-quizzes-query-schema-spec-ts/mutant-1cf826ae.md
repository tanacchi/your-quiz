# Mutant 1cf826ae Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 571
**Stable ID**: 1cf826ae
**Location**: L386:10–L386:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #571
@@ -382,9 +382,9 @@
         ["just below minimum", -1, false],
         ["small positive", 1, true],
         ["large positive", 999999, true],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
-      ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
+      ])("", (_desc, offset, isValid) => {
         const input = { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
