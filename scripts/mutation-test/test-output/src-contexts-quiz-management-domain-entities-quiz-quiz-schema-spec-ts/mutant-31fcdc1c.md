# Mutant 31fcdc1c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3206
**Stable ID**: 31fcdc1c
**Location**: L422:12–L422:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3206
@@ -418,9 +418,9 @@
       });
     });
   });
 
-  describe("Integration Scenarios", () => {
+  describe("", () => {
     it("should handle complete approved boolean quiz", () => {
       const fullApprovedQuiz = {
         id: "quiz-integration-123",
         question: "Is TypeScript strongly typed? 💪",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
