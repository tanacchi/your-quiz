# Mutant 0f20c1a2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 409
**Stable ID**: 0f20c1a2
**Location**: L263:29–L267:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #409
@@ -259,13 +259,9 @@
         };
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "approved"]);
-          expect(result.data.creatorId).toEqual("creator-123");
-          expect(result.data.quizId).toEqual(["quiz-1"]);
-        }
+        if (result.success) {}
       });
 
       it("should coerce string numbers to integers", () => {
         const rawInput = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
