# Mutant dc865fd8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 926
**Stable ID**: dc865fd8
**Location**: L38:10–L38:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #926
@@ -34,9 +34,9 @@
 
     describe("CreatorId validation", () => {
       it.each([
         ["valid alphanumeric", "creator-1", true],
-        ["valid with numbers", "creator123", true],
+        ["", "creator123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
