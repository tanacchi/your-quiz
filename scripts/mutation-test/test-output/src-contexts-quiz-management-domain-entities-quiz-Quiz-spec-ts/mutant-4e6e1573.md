# Mutant 4e6e1573 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1528
**Stable ID**: 4e6e1573
**Location**: L823:11–L823:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1528
@@ -819,9 +819,9 @@
       });
 
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const answerTypePatch = result.error.patches.find(
           (patch) =>
             typeof patch === "object" &&
             patch !== null &&
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
