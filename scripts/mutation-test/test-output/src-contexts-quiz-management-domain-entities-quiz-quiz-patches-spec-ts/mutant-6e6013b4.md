# Mutant 6e6013b4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2099
**Stable ID**: 6e6013b4
**Location**: L394:10–L394:82

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2099
@@ -390,9 +390,9 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should not suggest patches when answerType and solution are consistent", () => {
+      it("", () => {
         const quiz = {
           answerType: "boolean" as const,
           solution: { id: "solution-123", value: true },
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
