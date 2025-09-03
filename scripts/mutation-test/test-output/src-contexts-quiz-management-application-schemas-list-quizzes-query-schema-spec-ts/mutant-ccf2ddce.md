# Mutant ccf2ddce Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 754
**Stable ID**: ccf2ddce
**Location**: L608:57–L619:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #754
@@ -604,20 +604,9 @@
           expect(result.data.status).toHaveLength(2);
         }
       });
 
-      it("should handle quiz-specific filtering", () => {
-        const specificQuizRequest = {
-          quizId: ["quiz-abc123", "quiz-def456"],
-          status: ["approved"],
-        };
-        const result = listQuizzesQuerySchema.safeParse(specificQuizRequest);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.quizId).toEqual(["quiz-abc123", "quiz-def456"]);
-        }
-      });
+      it("should handle quiz-specific filtering", () => {});
     });
 
     describe("Performance and Memory", () => {
       it("should handle validation performance within reasonable time", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
