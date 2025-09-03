# Mutant b575040b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 100
**Stable ID**: b575040b
**Location**: L61:10–L61:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #100
@@ -57,9 +57,9 @@
         ["mixed valid and invalid", ["approved", "invalid"], false],
         ["empty array", [], true], // empty arrays are allowed
         ["non-array value", "approved", false],
         ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
+        ["", undefined, true], // Should apply default
       ])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const input = status === undefined ? {} : { status };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
