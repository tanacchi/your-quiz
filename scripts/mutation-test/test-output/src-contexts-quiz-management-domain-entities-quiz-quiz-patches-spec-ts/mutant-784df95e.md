# Mutant 784df95e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1672
**Stable ID**: 784df95e
**Location**: L44:29–L44:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1672
@@ -40,9 +40,9 @@
           "  Valid question?  ",
           [{ question: "Valid question?" }],
         ],
         ["empty string", "", [{ question: "Sample boolean question?" }]],
-        ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
+        ["only whitespace", "", [{ question: "Sample boolean question?" }]],
         ["exactly 500 chars", "A".repeat(500), []],
         ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
         ["valid question", "Valid question?", []],
         ["non-string input", 123, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
