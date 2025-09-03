# Mutant 71d9414a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 914
**Stable ID**: 71d9414a
**Location**: L28:10–L28:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #914
@@ -24,9 +24,9 @@
         ["valid alphanumeric", "quiz-1", true],
         ["valid with numbers", "quiz123", true],
         ["empty string", "", false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
