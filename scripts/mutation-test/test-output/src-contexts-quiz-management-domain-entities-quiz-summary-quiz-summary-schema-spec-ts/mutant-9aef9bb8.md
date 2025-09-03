# Mutant 9aef9bb8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4924
**Stable ID**: 9aef9bb8
**Location**: L27:12–L27:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4924
@@ -23,9 +23,9 @@
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
   };
 
-  describe("Brand Types", () => {
+  describe("", () => {
     describe("QuizId", () => {
       it.each([
         ["valid alphanumeric", "quiz-123", true],
         ["valid with underscore", "quiz_test", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
