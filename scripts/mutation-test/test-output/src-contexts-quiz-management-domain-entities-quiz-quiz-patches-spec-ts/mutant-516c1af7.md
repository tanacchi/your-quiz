# Mutant 516c1af7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2103
**Stable ID**: 516c1af7
**Location**: L397:27–L397:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2103
@@ -393,9 +393,9 @@
 
       it("should not suggest patches when answerType and solution are consistent", () => {
         const quiz = {
           answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
+          solution: { id: "", value: true },
         };
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
