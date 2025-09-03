# Mutant 652707ea Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2280
**Stable ID**: 652707ea
**Location**: L560:10–L560:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2280
@@ -556,9 +556,9 @@
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
       });
 
-      it("should include consistency patches at the end", () => {
+      it("", () => {
         const input = {
           answerType: "single_choice",
           solution: { id: "solution-123", value: true },
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
