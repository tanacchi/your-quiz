# Mutant 14d3f91c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 742
**Stable ID**: 14d3f91c
**Location**: L593:61–L606:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #742
@@ -589,23 +589,10 @@
           expect(result.data.offset).toBe(40);
         }
       });
 
-      it("should handle filtering by single creator", () => {
-        const singleCreatorRequest = {
-          status: ["approved", "pending_approval"],
-          creatorId: "teacher-1",
-          limit: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(singleCreatorRequest);
-        expect(result.success).toBe(true);
+      it("should handle filtering by single creator", () => {});
 
-        if (result.success) {
-          expect(result.data.creatorId).toBe("teacher-1");
-          expect(result.data.status).toHaveLength(2);
-        }
-      });
-
       it("should handle quiz-specific filtering", () => {
         const specificQuizRequest = {
           quizId: ["quiz-abc123", "quiz-def456"],
           status: ["approved"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
