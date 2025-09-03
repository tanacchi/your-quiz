# Mutant 2c54d94f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1301
**Stable ID**: 2c54d94f
**Location**: L512:17–L512:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1301
@@ -508,9 +508,9 @@
 
         it("should handle multiple patch applications", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-multi-patches",
+            id: "",
             question: "  ",
             answerType: "bool" as unknown as "boolean",
             solution: { id: "sol-multi-null", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
