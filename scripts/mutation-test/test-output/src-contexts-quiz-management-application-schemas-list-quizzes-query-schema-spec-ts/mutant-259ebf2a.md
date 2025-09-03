# Mutant 259ebf2a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 698
**Stable ID**: 259ebf2a
**Location**: L527:30–L536:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #698
@@ -523,18 +523,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          expect(error.issues.length).toBeGreaterThan(1);
-
-          const errorPaths = error.issues.map((issue) => issue.path[0]);
-          expect(errorPaths).toContain("status");
-          expect(errorPaths).toContain("creatorId");
-          expect(errorPaths).toContain("limit");
-          expect(errorPaths).toContain("offset");
-        }
+        if (!result.success) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
