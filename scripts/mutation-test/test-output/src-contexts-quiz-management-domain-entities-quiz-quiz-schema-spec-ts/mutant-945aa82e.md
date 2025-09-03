# Mutant 945aa82e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2926
**Stable ID**: 945aa82e
**Location**: L125:29–L127:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2926
@@ -121,11 +121,9 @@
       it("should only accept 'boolean' as answerType", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.answerType).toBe("boolean");
-        }
+        if (result.success) {}
       });
 
       it.each([
         ["single_choice", "single_choice"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
