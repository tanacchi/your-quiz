# Mutant ff2e1dba Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 644
**Stable ID**: ff2e1dba
**Location**: L461:30–L468:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #644
@@ -457,16 +457,9 @@
         const input = { status: ["invalid_status"] };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const statusError = error.issues.find((issue) =>
-            issue.path.includes("status"),
-          );
-          expect(statusError).toBeDefined();
-          expect(statusError?.code).toBe("invalid_value");
-        }
+        if (!result.success) {}
       });
 
       it("should provide specific error paths for invalid limit", () => {
         const input = { limit: 0 };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
