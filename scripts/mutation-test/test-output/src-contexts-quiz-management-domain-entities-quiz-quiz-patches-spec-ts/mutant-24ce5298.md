# Mutant 24ce5298 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1681
**Stable ID**: 24ce5298
**Location**: L46:10–L46:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1681
@@ -42,9 +42,9 @@
         ],
         ["empty string", "", [{ question: "Sample boolean question?" }]],
         ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
         ["exactly 500 chars", "A".repeat(500), []],
-        ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
+        ["", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
         ["valid question", "Valid question?", []],
         ["non-string input", 123, []],
         ["null input", null, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
