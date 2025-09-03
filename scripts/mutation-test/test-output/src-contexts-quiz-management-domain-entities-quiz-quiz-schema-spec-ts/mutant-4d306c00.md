# Mutant 4d306c00 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3141
**Stable ID**: 4d306c00
**Location**: L345:38–L348:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3141
@@ -341,12 +341,9 @@
         }
       });
 
       it("should reject boolean answerType with null solution", () => {
-        const dataWithNullSolution = {
-          ...validQuizData,
-          solution: null,
-        };
+        const dataWithNullSolution = {};
         const result = QuizSchema.safeParse(dataWithNullSolution);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
