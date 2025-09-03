# Mutant 178ec6b7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2787
**Stable ID**: 178ec6b7
**Location**: L30:14–L30:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2787
@@ -26,9 +26,9 @@
     createdAt: "2023-12-01 10:00:00",
   };
 
   describe("Brand Types Re-export", () => {
-    describe("QuizIdSchema", () => {
+    describe("", () => {
       it.each([
         ["valid format", "quiz-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
