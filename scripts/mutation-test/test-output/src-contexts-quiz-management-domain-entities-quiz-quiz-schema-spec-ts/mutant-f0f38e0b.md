# Mutant f0f38e0b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2925
**Stable ID**: f0f38e0b
**Location**: L125:13–L125:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2925
@@ -121,9 +121,9 @@
       it("should only accept 'boolean' as answerType", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.answerType).toBe("boolean");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
