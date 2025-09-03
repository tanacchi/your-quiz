# Mutant 83c6fbef Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1508
**Stable ID**: 83c6fbef
**Location**: L806:11–L806:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1508
@@ -802,9 +802,9 @@
       });
 
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const questionPatch = result.error.patches.find(
           (patch) =>
             typeof patch === "object" && patch !== null && "question" in patch,
         );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
