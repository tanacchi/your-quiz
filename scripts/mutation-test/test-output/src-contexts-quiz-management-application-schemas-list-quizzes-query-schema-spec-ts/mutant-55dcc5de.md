# Mutant 55dcc5de Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 682
**Stable ID**: 55dcc5de
**Location**: L506:30–L512:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #682
@@ -502,15 +502,9 @@
         const input = { creatorId: "" };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const creatorIdError = error.issues.find((issue) =>
-            issue.path.includes("creatorId"),
-          );
-          expect(creatorIdError).toBeDefined();
-        }
+        if (!result.success) {}
       });
     });
 
     describe("Multiple Validation Errors", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
