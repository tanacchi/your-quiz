# Mutant 0f0db88d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2079
**Stable ID**: 0f0db88d
**Location**: L363:14–L363:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2079
@@ -359,9 +359,9 @@
         });
       });
     });
 
-    describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
+    describe("", () => {
       it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
         const quiz = {
           answerType: "single_choice" as "boolean",
           solution: { id: "solution-123", value: true },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
