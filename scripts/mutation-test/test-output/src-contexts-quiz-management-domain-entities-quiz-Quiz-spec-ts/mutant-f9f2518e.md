# Mutant f9f2518e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 948
**Stable ID**: f9f2518e
**Location**: L54:26–L61:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #948
@@ -50,16 +50,9 @@
     it("should create valid quiz from complete data", () => {
       const result = Quiz.from(validQuizData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
-        const quiz = result.value;
-        expect(quiz.get("question")).toBe(
-          "Is TypeScript a superset of JavaScript?",
-        );
-        expect(quiz.get("answerType")).toBe("boolean");
-        expect(quiz.get("status")).toBe("pending_approval");
-      }
+      if (result.isOk()) {}
     });
 
     it("should suggest patches for invalid data", () => {
       const invalidData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
