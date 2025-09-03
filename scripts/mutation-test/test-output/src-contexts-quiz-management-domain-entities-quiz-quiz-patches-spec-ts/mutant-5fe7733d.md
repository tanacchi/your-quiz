# Mutant 5fe7733d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2494
**Stable ID**: 5fe7733d
**Location**: L795:8–L795:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2494
@@ -791,9 +791,9 @@
       );
       expect(hasQuestionPatch).toBe(true);
     });
 
-    it("should handle very long strings efficiently", () => {
+    it("", () => {
       const veryLongQuestion = "A".repeat(10000);
       const veryLongExplanation = "B".repeat(10000);
 
       const patches = suggestQuestionPatches(veryLongQuestion);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
