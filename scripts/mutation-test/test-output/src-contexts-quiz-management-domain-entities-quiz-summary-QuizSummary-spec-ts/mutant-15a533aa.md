# Mutant 15a533aa Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3787
**Stable ID**: 15a533aa
**Location**: L529:8–L529:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3787
@@ -525,9 +525,9 @@
     beforeEach(() => {
       draft = new QuizSummary.Draft();
     });
 
-    it("should initialize with empty state", () => {
+    it("", () => {
       expect(draft.state).toEqual({});
     });
 
     describe("Field operations", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
