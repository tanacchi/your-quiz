# Mutant 9dd336ed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2145
**Stable ID**: 9dd336ed
**Location**: L460:15–L460:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2145
@@ -456,9 +456,9 @@
       });
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
-          id: "  quiz-123  ",
+          id: "",
           question: "  Valid question?  ",
           answerType: "bool",
           status: "pending",
           solution: null,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
