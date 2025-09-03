# Mutant fa388c10 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1451
**Stable ID**: fa388c10
**Location**: L727:12–L727:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1451
@@ -723,9 +723,9 @@
           // State should remain unchanged
           expect(draft.state).toEqual(originalState);
         });
 
-        it("should automatically revalidate after applying patches", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-revalidate",
             question: "", // Invalid
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
