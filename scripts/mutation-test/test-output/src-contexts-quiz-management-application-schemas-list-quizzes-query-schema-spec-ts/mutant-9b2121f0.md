# Mutant 9b2121f0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 764
**Stable ID**: 9b2121f0
**Location**: L616:29–L618:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #764
@@ -612,11 +612,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(specificQuizRequest);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.quizId).toEqual(["quiz-abc123", "quiz-def456"]);
-        }
+        if (result.success) {}
       });
     });
 
     describe("Performance and Memory", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
