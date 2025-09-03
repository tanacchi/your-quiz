# Mutant e13124bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1677
**Stable ID**: e13124bf
**Location**: L45:10–L45:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1677
@@ -41,9 +41,9 @@
           [{ question: "Valid question?" }],
         ],
         ["empty string", "", [{ question: "Sample boolean question?" }]],
         ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
-        ["exactly 500 chars", "A".repeat(500), []],
+        ["", "A".repeat(500), []],
         ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
         ["valid question", "Valid question?", []],
         ["non-string input", 123, []],
         ["null input", null, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
