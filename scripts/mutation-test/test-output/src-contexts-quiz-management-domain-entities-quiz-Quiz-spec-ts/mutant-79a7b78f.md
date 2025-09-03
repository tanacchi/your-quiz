# Mutant 79a7b78f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1322
**Stable ID**: 79a7b78f
**Location**: L544:12–L544:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1322
@@ -540,9 +540,9 @@
             expect(finalResult.error.issues.length).toBeLessThanOrEqual(2);
           }
         });
 
-        it("should preserve valid fields when applying patches", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           const validData = {
             id: "quiz-preserve",
             question: "Valid question to preserve?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
