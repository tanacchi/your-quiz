# Mutant 21791fde Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 470
**Stable ID**: 21791fde
**Location**: L296:9–L296:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #470
@@ -292,9 +292,9 @@
         ["invalid offset string", { offset: "xyz" }, NaN, false],
         ["negative limit string", { limit: "-5" }, -5, false],
         ["negative offset string", { offset: "-1" }, -1, false],
       ])(
-        "should handle numeric coercion: %s",
+        "",
         (_desc, input, expected, isValid) => {
           const result = listQueryFromReq.safeParse(input);
           expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
