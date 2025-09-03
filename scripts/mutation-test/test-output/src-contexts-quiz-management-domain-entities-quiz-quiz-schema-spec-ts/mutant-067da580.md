# Mutant 067da580 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2917
**Stable ID**: 067da580
**Location**: L114:29–L116:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2917
@@ -110,11 +110,9 @@
         };
         const result = QuizSchema.safeParse(dataWithWhitespace);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.question).toBe("Valid question");
-        }
+        if (result.success) {}
       });
     });
 
     describe("AnswerType Field", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
