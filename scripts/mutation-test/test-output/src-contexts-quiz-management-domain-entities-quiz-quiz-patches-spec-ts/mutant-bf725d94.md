# Mutant bf725d94 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2111
**Stable ID**: bf725d94
**Location**: L410:12–L410:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2111
@@ -406,9 +406,9 @@
         expect(result).toEqual([]);
       });
 
       describe("Patch Application", () => {
-        it("should apply answerType consistency patch correctly", () => {
+        it("", () => {
           const input = {
             ...validQuizInput,
             answerType: "single_choice" as "boolean",
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
