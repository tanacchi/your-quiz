# Mutant b5facf6f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2101
**Stable ID**: b5facf6f
**Location**: L395:22–L398:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2101
@@ -391,12 +391,9 @@
         vi.restoreAllMocks();
       });
 
       it("should not suggest patches when answerType and solution are consistent", () => {
-        const quiz = {
-          answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
-        };
+        const quiz = {};
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
