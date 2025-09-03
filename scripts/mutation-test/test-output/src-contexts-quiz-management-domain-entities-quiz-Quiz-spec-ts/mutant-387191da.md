# Mutant 387191da Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1284
**Stable ID**: 387191da
**Location**: L479:17–L479:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1284
@@ -475,9 +475,9 @@
       describe("Patch System Integration", () => {
         it("should work with patch application using applyPatches", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-patches",
+            id: "",
             question: "   ", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
             solution: { id: "sol-patches", value: true },
             status: "pending_approval", // Valid status
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
