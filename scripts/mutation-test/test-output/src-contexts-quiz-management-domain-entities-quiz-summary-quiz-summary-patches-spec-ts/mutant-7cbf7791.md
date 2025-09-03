# Mutant 7cbf7791 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4199
**Stable ID**: 7cbf7791
**Location**: L148:14–L148:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4199
@@ -144,9 +144,9 @@
         });
       });
     });
 
-    describe("suggestAnswerTypePatches", () => {
+    describe("", () => {
       it.each([
         ["single typo", "single", [{ answerType: "single_choice" }]],
         ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
         ["bool typo", "bool", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
