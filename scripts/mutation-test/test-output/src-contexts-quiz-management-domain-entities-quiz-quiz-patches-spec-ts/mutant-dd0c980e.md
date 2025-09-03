# Mutant dd0c980e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2506
**Stable ID**: dd0c980e
**Location**: L810:8–L810:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2506
@@ -806,9 +806,9 @@
     });
   });
 
   describe("Complex Integration Scenarios", () => {
-    it("should handle complete quiz transformation", () => {
+    it("", () => {
       const messyInput: QuizData = {
         id: "  quiz-123  " as QuizId,
         question: "",
         explanation: "A".repeat(1001),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
