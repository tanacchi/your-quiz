# Mutant ad88f043 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3005
**Stable ID**: ad88f043
**Location**: L203:15–L208:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3005
@@ -199,14 +199,9 @@
           expect(result.data.explanation).toBeUndefined();
         }
       });
 
-      it.each([
-        ["exactly 1000 chars", "A".repeat(1000), true],
-        ["1001 chars", "A".repeat(1001), false],
-        ["empty string", "", true],
-        ["only whitespace", "   ", true],
-      ])(
+      it.each([])(
         "should validate explanation length: %s -> %s",
         (_desc, explanation, isValid) => {
           const data = { ...validQuizData, explanation };
           const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
