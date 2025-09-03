# Mutant 7b7f6c4b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 174
**Stable ID**: 7b7f6c4b
**Location**: L104:15–L116:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #174
@@ -100,21 +100,9 @@
       });
     });
 
     describe("QuizId Field Validation", () => {
-      it.each([
-        ["valid single quizId", ["quiz-123"], true],
-        ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
-        ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
-        ["valid alphanumeric", ["q1"], true],
-        ["empty string in array", [""], false],
-        ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
-        ["mixed valid and empty", ["quiz-1", ""], false],
-        ["empty array", [], true],
-        ["non-array value", "quiz-123", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true],
-      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
+      it.each([])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
         const input = quizId === undefined ? {} : { quizId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
