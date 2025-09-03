# Mutant 90402ed7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2785
**Stable ID**: 90402ed7
**Location**: L29:12–L29:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2785
@@ -25,9 +25,9 @@
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
   };
 
-  describe("Brand Types Re-export", () => {
+  describe("", () => {
     describe("QuizIdSchema", () => {
       it.each([
         ["valid format", "quiz-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
