# Mutant 6d3d2148 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 228
**Stable ID**: 6d3d2148
**Location**: L116:74–L124:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #228
@@ -112,17 +112,9 @@
         ["empty array", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
-      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
-        const input = quizId === undefined ? {} : { quizId };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success && quizId !== undefined) {
-          expect(result.data.quizId).toEqual(quizId);
-        }
-      });
+      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {});
     });
 
     describe("Limit Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
