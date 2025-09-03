# Mutant 26cb07f2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 650
**Stable ID**: 26cb07f2
**Location**: L471:73–L484:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #650
@@ -467,23 +467,10 @@
           expect(statusError?.code).toBe("invalid_value");
         }
       });
 
-      it("should provide specific error paths for invalid limit", () => {
-        const input = { limit: 0 };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(false);
+      it("should provide specific error paths for invalid limit", () => {});
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const limitError = error.issues.find((issue) =>
-            issue.path.includes("limit"),
-          );
-          expect(limitError).toBeDefined();
-          expect(limitError?.code).toBe("too_small");
-        }
-      });
-
       it("should provide specific error paths for invalid offset", () => {
         const input = { offset: -1 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
