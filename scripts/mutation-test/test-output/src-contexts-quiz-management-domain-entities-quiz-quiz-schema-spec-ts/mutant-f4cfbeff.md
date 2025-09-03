# Mutant f4cfbeff Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3205
**Stable ID**: f4cfbeff
**Location**: L414:29–L417:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3205
@@ -410,12 +410,9 @@
         const data = { ...validQuizData, solution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.solution.value).toBe(solution.value);
-          expect(result.data.solution.id).toBe(solution.id);
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
