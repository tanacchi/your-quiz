# Mutant b46f1052 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 790
**Stable ID**: b46f1052
**Location**: L647:39–L650:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #790
@@ -643,12 +643,9 @@
       it("should maintain memory efficiency with repeated validations", () => {
         const input = { status: ["approved"], limit: 10, offset: 0 };
 
         // Validate the same input multiple times
-        for (let i = 0; i < 100; i++) {
-          const result = listQuizzesQuerySchema.safeParse(input);
-          expect(result.success).toBe(true);
-        }
+        for (let i = 0; i < 100; i++) {}
       });
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
