# Mutant 6b556df8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3140
**Stable ID**: 6b556df8
**Location**: L344:71–L351:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3140
@@ -340,16 +340,9 @@
           expect(solutionError?.message).toContain("expected object");
         }
       });
 
-      it("should reject boolean answerType with null solution", () => {
-        const dataWithNullSolution = {
-          ...validQuizData,
-          solution: null,
-        };
-        const result = QuizSchema.safeParse(dataWithNullSolution);
-        expect(result.success).toBe(false);
-      });
+      it("should reject boolean answerType with null solution", () => {});
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
