# Mutant ed349a38 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4457
**Stable ID**: ed349a38
**Location**: L363:10–L363:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4457
@@ -359,9 +359,9 @@
           expect(result).toEqual([]);
         });
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
+      it("", () => {
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question  ",
           answerType: "single",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
