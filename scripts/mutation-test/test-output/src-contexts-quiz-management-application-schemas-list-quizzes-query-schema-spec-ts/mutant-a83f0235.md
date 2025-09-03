# Mutant a83f0235 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 498
**Stable ID**: a83f0235
**Location**: L324:29–L331:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #498
@@ -320,16 +320,9 @@
         };
         const result = listQueryFromReq.safeParse(httpQueryParams);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved", "pending_approval"]);
-          expect(result.data.creatorId).toEqual("user-123");
-          expect(result.data.limit).toBe(20);
-          expect(result.data.offset).toBe(0);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
+        if (result.success) {}
       });
 
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
