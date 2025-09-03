# Mutant 3eab5582 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1665
**Stable ID**: 3eab5582
**Location**: L43:10–L43:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1665
@@ -39,9 +39,9 @@
           "untrimmed question",
           "  Valid question?  ",
           [{ question: "Valid question?" }],
         ],
-        ["empty string", "", [{ question: "Sample boolean question?" }]],
+        ["", "", [{ question: "Sample boolean question?" }]],
         ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
         ["exactly 500 chars", "A".repeat(500), []],
         ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
         ["valid question", "Valid question?", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
