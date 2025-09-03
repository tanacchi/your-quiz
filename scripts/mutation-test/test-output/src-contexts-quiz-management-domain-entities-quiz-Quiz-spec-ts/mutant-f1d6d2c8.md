# Mutant f1d6d2c8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 946
**Stable ID**: f1d6d2c8
**Location**: L54:11–L54:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #946
@@ -50,9 +50,9 @@
     it("should create valid quiz from complete data", () => {
       const result = Quiz.from(validQuizData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (true) {
         const quiz = result.value;
         expect(quiz.get("question")).toBe(
           "Is TypeScript a superset of JavaScript?",
         );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
