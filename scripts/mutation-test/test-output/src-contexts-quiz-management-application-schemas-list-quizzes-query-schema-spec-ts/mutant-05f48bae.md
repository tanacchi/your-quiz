# Mutant 05f48bae Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 327
**Stable ID**: 05f48bae
**Location**: L173:10–L173:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #327
@@ -169,9 +169,9 @@
         ["very large offset", 999999, true],
         ["negative offset", -1, false],
         ["decimal number", 5.5, false],
         ["string number", "0", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
         const input = offset === undefined ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
