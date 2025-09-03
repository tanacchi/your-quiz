# Mutant b47caec5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1558
**Stable ID**: b47caec5
**Location**: L849:11–L849:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1558
@@ -845,9 +845,9 @@
       });
 
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const statusPatch = result.error.patches.find(
           (patch) =>
             typeof patch === "object" && patch !== null && "status" in patch,
         );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
