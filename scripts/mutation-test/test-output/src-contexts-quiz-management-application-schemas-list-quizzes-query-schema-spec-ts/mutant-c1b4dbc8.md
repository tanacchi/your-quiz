# Mutant c1b4dbc8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 669
**Stable ID**: c1b4dbc8
**Location**: L491:30–L498:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #669
@@ -487,16 +487,9 @@
         const input = { offset: -1 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const offsetError = error.issues.find((issue) =>
-            issue.path.includes("offset"),
-          );
-          expect(offsetError).toBeDefined();
-          expect(offsetError?.code).toBe("too_small");
-        }
+        if (!result.success) {}
       });
 
       it("should provide errors for empty strings", () => {
         const input = { creatorId: "" };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
