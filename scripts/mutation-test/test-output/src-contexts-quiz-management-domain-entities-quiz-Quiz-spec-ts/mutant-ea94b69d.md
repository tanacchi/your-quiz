# Mutant ea94b69d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1220
**Stable ID**: ea94b69d
**Location**: L404:16–L404:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1220
@@ -400,9 +400,9 @@
           }
         });
       });
 
-      describe("Error Handling", () => {
+      describe("", () => {
         it("should handle invalid draft data", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
