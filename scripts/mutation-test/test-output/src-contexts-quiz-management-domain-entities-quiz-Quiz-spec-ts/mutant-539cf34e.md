# Mutant 539cf34e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1342
**Stable ID**: 539cf34e
**Location**: L577:16–L577:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1342
@@ -573,9 +573,9 @@
           expect(draft.get("solution")).toEqual(originalSolution);
         });
       });
 
-      describe("Edge Cases", () => {
+      describe("", () => {
         it("should handle empty draft", () => {
           const draft = new Quiz.Draft();
 
           const result = Quiz.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
