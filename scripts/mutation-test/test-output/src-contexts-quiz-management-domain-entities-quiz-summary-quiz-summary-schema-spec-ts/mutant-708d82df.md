# Mutant 708d82df Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5298
**Stable ID**: 708d82df
**Location**: L336:12–L336:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5298
@@ -332,9 +332,9 @@
       });
     });
   });
 
-  describe("Edge Cases and Boundary Values", () => {
+  describe("", () => {
     describe("Long Strings", () => {
       it("should accept very long question", () => {
         const longQuestion = "A".repeat(1000);
         const data = { ...validQuizSummaryData, question: longQuestion };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
