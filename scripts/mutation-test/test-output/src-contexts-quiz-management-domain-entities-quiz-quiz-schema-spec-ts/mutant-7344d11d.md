# Mutant 7344d11d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2960
**Stable ID**: 7344d11d
**Location**: L154:29–L156:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2960
@@ -150,11 +150,9 @@
         const data = { ...validQuizData, solution: validSolution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.solution).toEqual(validSolution);
-        }
+        if (result.success) {}
       });
 
       it.each([
         ["missing id", { value: true }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
