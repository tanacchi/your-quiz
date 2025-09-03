# Mutant 67b45c34 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2102
**Stable ID**: 67b45c34
**Location**: L397:21–L397:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2102
@@ -393,9 +393,9 @@
 
       it("should not suggest patches when answerType and solution are consistent", () => {
         const quiz = {
           answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
+          solution: {},
         };
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
