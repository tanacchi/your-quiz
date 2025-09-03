# Mutant 638af0bb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1030
**Stable ID**: 638af0bb
**Location**: L157:44–L157:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1030
@@ -153,9 +153,9 @@
         }
       });
 
       it("should reject quiz correctly", () => {
-        const rejectedResult = quiz.reject("Quality issues");
+        const rejectedResult = quiz.reject("");
         expect(rejectedResult.isOk()).toBe(true);
 
         if (rejectedResult.isOk()) {
           const rejectedQuiz = rejectedResult.value;
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
