# Mutant 0c840c20 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2841
**Stable ID**: 0c840c20
**Location**: L63:13–L63:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2841
@@ -59,9 +59,9 @@
       it("should accept valid complete boolean quiz", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           const data = result.data as QuizData;
           expect(data.id).toBe(validQuizData.id);
           expect(data.question).toBe(validQuizData.question);
           expect(data.answerType).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
