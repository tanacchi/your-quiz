# Mutant 2ef6e55c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: MethodExpression
**Original ID**: 2479
**Stable ID**: 2ef6e55c
**Location**: L786:32–L791:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2479
@@ -782,14 +782,9 @@
         largeIssues,
       );
 
       expect(result.length).toBeGreaterThan(0);
-      const hasQuestionPatch = result.some(
-        (patch) =>
-          typeof patch === "object" &&
-          "question" in patch &&
-          patch.question === "untrimmed",
-      );
+      const hasQuestionPatch = result.every(patch => typeof patch === "object" && "question" in patch && patch.question === "untrimmed");
       expect(hasQuestionPatch).toBe(true);
     });
 
     it("should handle very long strings efficiently", () => {
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
