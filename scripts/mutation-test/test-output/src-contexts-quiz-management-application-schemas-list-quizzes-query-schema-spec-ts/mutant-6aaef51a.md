# Mutant 6aaef51a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 173
**Stable ID**: 6aaef51a
**Location**: L103:47–L125:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #173
@@ -99,32 +99,10 @@
         }
       });
     });
 
-    describe("QuizId Field Validation", () => {
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
-        const input = quizId === undefined ? {} : { quizId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
+    describe("QuizId Field Validation", () => {});
 
-        if (isValid && result.success && quizId !== undefined) {
-          expect(result.data.quizId).toEqual(quizId);
-        }
-      });
-    });
-
     describe("Limit Field Validation", () => {
       it.each([
         ["minimum valid limit", 1, true],
         ["default limit", 10, true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
