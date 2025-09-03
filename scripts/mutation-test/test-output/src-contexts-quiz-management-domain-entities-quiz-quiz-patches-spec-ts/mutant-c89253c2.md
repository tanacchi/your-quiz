# Mutant c89253c2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2104
**Stable ID**: c89253c2
**Location**: L397:50–L397:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2104
@@ -393,9 +393,9 @@
 
       it("should not suggest patches when answerType and solution are consistent", () => {
         const quiz = {
           answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
+          solution: { id: "solution-123", value: false },
         };
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
