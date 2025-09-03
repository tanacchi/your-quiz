# Mutant 9c4673c8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 36
**Stable ID**: 9c4673c8
**Location**: L36:29–L40:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #36
@@ -32,13 +32,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(customInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "rejected"]);
-          expect(result.data.limit).toBe(25);
-          expect(result.data.offset).toBe(50);
-        }
+        if (result.success) {}
       });
     });
 
     describe("Status Field Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
