# Mutant ee175550 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 330
**Stable ID**: ee175550
**Location**: L174:10–L174:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #330
@@ -170,9 +170,9 @@
         ["negative offset", -1, false],
         ["decimal number", 5.5, false],
         ["string number", "0", false],
         ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
+        ["", undefined, true], // Should apply default
       ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
         const input = offset === undefined ? {} : { offset };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
