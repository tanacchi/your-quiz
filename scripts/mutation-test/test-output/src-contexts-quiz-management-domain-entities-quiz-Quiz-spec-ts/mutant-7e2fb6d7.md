# Mutant 7e2fb6d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1138
**Stable ID**: 7e2fb6d7
**Location**: L307:12–L307:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1138
@@ -303,9 +303,9 @@
     });
 
     describe("Quiz.fromDraft Method", () => {
       describe("Successful Conversion", () => {
-        it("should create Quiz entity from valid draft", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-from-draft",
             question: "Is Rust a systems programming language?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
