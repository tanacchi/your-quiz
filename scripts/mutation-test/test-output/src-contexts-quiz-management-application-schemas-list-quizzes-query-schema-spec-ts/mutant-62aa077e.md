# Mutant 62aa077e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 356
**Stable ID**: 62aa077e
**Location**: L200:54–L214:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #356
@@ -196,24 +196,10 @@
       });
     });
 
     describe("Complex Validation Scenarios", () => {
-      it("should accept valid complete query", () => {
-        const validQuery = {
-          status: ["approved", "pending_approval"],
-          creatorId: "creator-123",
-          quizId: ["quiz-1", "quiz-2", "quiz-3"],
-          limit: 25,
-          offset: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(validQuery);
-        expect(result.success).toBe(true);
+      it("should accept valid complete query", () => {});
 
-        if (result.success) {
-          expect(result.data).toEqual(validQuery);
-        }
-      });
-
       it("should reject invalid field combinations", () => {
         const invalidQuery = {
           status: ["invalid_status"],
           creatorId: "", // empty string not allowed
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
