# Mutant ed1acaa3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1437
**Stable ID**: ed1acaa3
**Location**: L706:12–L706:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1437
@@ -702,9 +702,9 @@
           const finalErrorCount = draft.getIssues().length;
           expect(finalErrorCount).toBeLessThanOrEqual(initialErrorCount);
         });
 
-        it("should handle empty patches array", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-empty-patches",
             question: "Valid question?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
