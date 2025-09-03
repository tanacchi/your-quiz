# Mutant da42db93 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2836
**Stable ID**: da42db93
**Location**: L58:39–L87:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2836
@@ -54,39 +54,10 @@
     });
   });
 
   describe("QuizSchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid complete boolean quiz", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+    describe("Required Fields", () => {});
 
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
-      it.each([
-        ["id", { ...validQuizData, id: undefined }],
-        ["question", { ...validQuizData, question: undefined }],
-        ["answerType", { ...validQuizData, answerType: undefined }],
-        ["solution", { ...validQuizData, solution: undefined }],
-        ["status", { ...validQuizData, status: undefined }],
-        ["creatorId", { ...validQuizData, creatorId: undefined }],
-        ["createdAt", { ...validQuizData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = QuizSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
     describe("Question Field", () => {
       it.each([
         ["valid question", "Is TypeScript compiled?", true],
         ["single character after trim", " A ", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
