# Mutant 08b229d6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 944
**Stable ID**: 08b229d6
**Location**: L50:61–L62:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #944
@@ -46,22 +46,10 @@
     });
   });
 
   describe("Entity Creation", () => {
-    it("should create valid quiz from complete data", () => {
-      const result = Quiz.from(validQuizData);
-      expect(result.isOk()).toBe(true);
+    it("should create valid quiz from complete data", () => {});
 
-      if (result.isOk()) {
-        const quiz = result.value;
-        expect(quiz.get("question")).toBe(
-          "Is TypeScript a superset of JavaScript?",
-        );
-        expect(quiz.get("answerType")).toBe("boolean");
-        expect(quiz.get("status")).toBe("pending_approval");
-      }
-    });
-
     it("should suggest patches for invalid data", () => {
       const invalidData = {
         ...validQuizData,
         question: "  ", // 空白のみ
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
