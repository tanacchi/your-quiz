# Mutant 1b28555a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 930
**Stable ID**: 1b28555a
**Location**: L39:10–L39:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #930
@@ -35,9 +35,9 @@
     describe("CreatorId validation", () => {
       it.each([
         ["valid alphanumeric", "creator-1", true],
         ["valid with numbers", "creator123", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = CreatorId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
