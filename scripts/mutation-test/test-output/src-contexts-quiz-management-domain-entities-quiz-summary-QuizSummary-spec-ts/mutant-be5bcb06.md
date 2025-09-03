# Mutant be5bcb06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3283
**Stable ID**: be5bcb06
**Location**: L24:15–L34:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3283
@@ -20,19 +20,9 @@
   beforeEach(() => {});
 
   describe("Brand Types", () => {
     describe("QuizId validation", () => {
-      it.each([
-        ["valid alphanumeric", "quiz-1", true],
-        ["valid with numbers", "quiz123", true],
-        ["valid with underscore", "quiz_test", true],
-        ["valid with dash", "quiz-test", true],
-        ["valid single char", "q", true],
-        ["empty string", "", false],
-        ["only spaces", "   ", true], // min(1) では空でなければ有効
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
 
         expect(result.success).toBe(isValid);
         if (isValid && result.success) {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
