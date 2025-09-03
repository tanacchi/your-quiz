# Mutant 0ce1eea1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1494
**Stable ID**: 0ce1eea1
**Location**: L784:24–L786:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1494
@@ -780,11 +780,9 @@
             createdAt: "2023-12-01 10:00:00",
           });
 
           // Should not crash when empty patches array is provided
-          expect(() => {
-            draft.applyPatches([]);
-          }).not.toThrow();
+          expect(() => {}).not.toThrow();
 
           // Should not crash when valid patch is provided
           expect(() => {
             draft.applyPatches([{ explanation: "Test explanation" }]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
