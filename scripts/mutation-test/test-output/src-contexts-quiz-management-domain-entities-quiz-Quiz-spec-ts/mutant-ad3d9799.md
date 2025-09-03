# Mutant ad3d9799 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1429
**Stable ID**: ad3d9799
**Location**: L684:17–L684:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1429
@@ -680,9 +680,9 @@
 
         it("should apply multiple patches correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-multi-patch",
+            id: "",
             question: "  ", // Invalid
             answerType: "bool" as unknown as "boolean", // Invalid
             solution: { id: "sol-multi", value: true },
             status: "pending_approval", // Invalid
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
