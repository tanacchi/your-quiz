# Mutant 8a80f65e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2838
**Stable ID**: 8a80f65e
**Location**: L59:61–L73:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2838
@@ -55,24 +55,10 @@
   });
 
   describe("QuizSchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid complete boolean quiz", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+      it("should accept valid complete boolean quiz", () => {});
 
-        if (result.success) {
-          const data = result.data as QuizData;
-          expect(data.id).toBe(validQuizData.id);
-          expect(data.question).toBe(validQuizData.question);
-          expect(data.answerType).toBe("boolean");
-          expect(data.solution).toEqual(validBooleanSolution);
-          expect(data.status).toBe(validQuizData.status);
-          expect(data.creatorId).toBe(validQuizData.creatorId);
-          expect(data.createdAt).toBe(validQuizData.createdAt);
-        }
-      });
-
       it.each([
         ["id", { ...validQuizData, id: undefined }],
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
