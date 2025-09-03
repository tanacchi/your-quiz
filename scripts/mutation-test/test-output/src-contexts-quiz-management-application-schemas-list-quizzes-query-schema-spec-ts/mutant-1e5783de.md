# Mutant 1e5783de Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 97
**Stable ID**: 1e5783de
**Location**: L60:10–L60:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #97
@@ -56,9 +56,9 @@
         ["invalid status", ["invalid_status"], false],
         ["mixed valid and invalid", ["approved", "invalid"], false],
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, true], // Should apply default
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const input = status === undefined ? {} : { status };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
