# Mutant 5ddf7fb6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2946
**Stable ID**: 5ddf7fb6
**Location**: L137:77–L141:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2946
@@ -133,13 +133,9 @@
         ["free_text", "free_text"],
         ["invalid_type", "invalid_type"],
         ["", ""],
         [null, null],
-      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
-        const data = { ...validQuizData, answerType };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
+      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {});
     });
 
     describe("Solution Field", () => {
       it("should accept valid BooleanSolution", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
