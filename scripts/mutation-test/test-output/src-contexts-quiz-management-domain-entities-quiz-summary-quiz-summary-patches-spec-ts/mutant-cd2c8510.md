# Mutant cd2c8510 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4460
**Stable ID**: cd2c8510
**Location**: L365:15–L365:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4460
@@ -361,9 +361,9 @@
       });
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
-          id: "  quiz-123  ",
+          id: "",
           question: "  Valid question  ",
           answerType: "single",
           status: "pending",
           tagIds: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
