# Mutant e50c0ae4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4930
**Stable ID**: e50c0ae4
**Location**: L30:10–L30:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4930
@@ -26,9 +26,9 @@
 
   describe("Brand Types", () => {
     describe("QuizId", () => {
       it.each([
-        ["valid alphanumeric", "quiz-123", true],
+        ["", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
         ["valid single char", "q", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
