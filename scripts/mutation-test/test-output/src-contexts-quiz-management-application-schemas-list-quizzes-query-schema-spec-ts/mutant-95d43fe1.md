# Mutant 95d43fe1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 522
**Stable ID**: 95d43fe1
**Location**: L354:29–L358:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #522
@@ -350,13 +350,9 @@
         };
         const result = listQueryFromReq.safeParse(typedInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(Array.isArray(result.data.status)).toBe(true);
-          expect(typeof result.data.limit).toBe("number");
-          expect(typeof result.data.offset).toBe("number");
-        }
+        if (result.success) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
