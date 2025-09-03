# Mutant 2bde8c4d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2081
**Stable ID**: 2bde8c4d
**Location**: L364:10–L364:99

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2081
@@ -360,9 +360,9 @@
       });
     });
 
     describe("suggestAnswerTypeSolutionConsistencyPatches", () => {
-      it("should suggest answerType correction when solution exists but answerType is not boolean", () => {
+      it("", () => {
         const quiz = {
           answerType: "single_choice" as "boolean",
           solution: { id: "solution-123", value: true },
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
