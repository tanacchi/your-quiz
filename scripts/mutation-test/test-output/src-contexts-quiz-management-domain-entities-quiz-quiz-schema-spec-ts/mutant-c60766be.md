# Mutant c60766be Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3023
**Stable ID**: c60766be
**Location**: L210:42–L214:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3023
@@ -206,13 +206,9 @@
         ["empty string", "", true],
         ["only whitespace", "   ", true],
       ])(
         "should validate explanation length: %s -> %s",
-        (_desc, explanation, isValid) => {
-          const data = { ...validQuizData, explanation };
-          const result = QuizSchema.safeParse(data);
-          expect(result.success).toBe(isValid);
-        },
+        (_desc, explanation, isValid) => {},
       );
     });
 
     describe("Status Field", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
