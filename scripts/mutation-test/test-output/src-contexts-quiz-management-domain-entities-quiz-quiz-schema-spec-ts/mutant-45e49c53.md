# Mutant 45e49c53 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2791
**Stable ID**: 45e49c53
**Location**: L32:10–L32:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2791
@@ -28,9 +28,9 @@
 
   describe("Brand Types Re-export", () => {
     describe("QuizIdSchema", () => {
       it.each([
-        ["valid format", "quiz-123", true],
+        ["", "quiz-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
