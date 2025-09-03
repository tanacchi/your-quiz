# Mutant 31fce6bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2100
**Stable ID**: 31fce6bf
**Location**: L394:90–L401:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2100
@@ -390,16 +390,9 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should not suggest patches when answerType and solution are consistent", () => {
-        const quiz = {
-          answerType: "boolean" as const,
-          solution: { id: "solution-123", value: true },
-        };
-        const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
-        expect(result).toEqual([]);
-      });
+      it("should not suggest patches when answerType and solution are consistent", () => {});
 
       it("should not suggest patches when no answerType or solution", () => {
         const quiz = {};
         const result = suggestAnswerTypeSolutionConsistencyPatches(quiz);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
