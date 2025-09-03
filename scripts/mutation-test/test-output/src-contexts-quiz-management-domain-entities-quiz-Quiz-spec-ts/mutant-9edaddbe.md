# Mutant 9edaddbe Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 962
**Stable ID**: 9edaddbe
**Location**: L75:11–L75:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #962
@@ -71,9 +71,9 @@
 
       const result = Quiz.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const { issues, patches } = result.error;
         expect(issues.length).toBeGreaterThan(0);
         expect(patches.length).toBeGreaterThan(0);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
