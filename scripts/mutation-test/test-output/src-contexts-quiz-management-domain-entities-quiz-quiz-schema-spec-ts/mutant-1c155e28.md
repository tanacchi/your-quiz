# Mutant 1c155e28 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3227
**Stable ID**: 1c155e28
**Location**: L452:8–L452:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3227
@@ -448,9 +448,9 @@
         expect(result.data.explanation).toBeDefined();
       }
     });
 
-    it("should handle minimal valid boolean quiz", () => {
+    it("", () => {
       const minimalQuiz = {
         id: "q",
         question: "Yes?",
         answerType: "boolean" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
