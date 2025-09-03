# Mutant e1d2ee0d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2908
**Stable ID**: e1d2ee0d
**Location**: L100:78–L104:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2908
@@ -96,13 +96,9 @@
         ["empty string", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
         ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizData, question };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate question: %s -> %s", (_desc, question, isValid) => {});
 
       it("should trim whitespace from question", () => {
         const dataWithWhitespace = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
