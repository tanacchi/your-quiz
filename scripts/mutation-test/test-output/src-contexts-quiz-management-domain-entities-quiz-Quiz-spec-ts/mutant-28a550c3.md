# Mutant 28a550c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1235
**Stable ID**: 28a550c3
**Location**: L420:15–L420:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1235
@@ -416,9 +416,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
 
-          if (result.isErr()) {
+          if (true) {
             expect(result.error.issues).toHaveLength(1);
             expect(result.error.issues[0]?.path[0]).toBe("question");
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
