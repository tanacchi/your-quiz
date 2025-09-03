# Mutant 45d602c8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1360
**Stable ID**: 45d602c8
**Location**: L606:12–L606:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1360
@@ -602,9 +602,9 @@
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
 
-        it("should be equivalent to draft.commit()", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
