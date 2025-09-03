# Mutant 315bc547 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 727
**Stable ID**: 315bc547
**Location**: L569:29–L573:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #727
@@ -565,13 +565,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(partialInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval"]);
-          expect(result.data.limit).toBe(5);
-          expect(result.data.offset).toBe(0); // default
-        }
+        if (result.success) {}
       });
     });
 
     describe("Real-world Integration Scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
