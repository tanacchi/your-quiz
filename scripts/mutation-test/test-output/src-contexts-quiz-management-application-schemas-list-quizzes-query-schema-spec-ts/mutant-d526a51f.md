# Mutant d526a51f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 172
**Stable ID**: d526a51f
**Location**: L103:14–L103:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #172
@@ -99,9 +99,9 @@
         }
       });
     });
 
-    describe("QuizId Field Validation", () => {
+    describe("", () => {
       it.each([
         ["valid single quizId", ["quiz-123"], true],
         ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
         ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
