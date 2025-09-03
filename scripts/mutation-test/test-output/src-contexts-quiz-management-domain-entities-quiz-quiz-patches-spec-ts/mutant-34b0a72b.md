# Mutant 34b0a72b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1738
**Stable ID**: 34b0a72b
**Location**: L99:32–L99:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1738
@@ -95,9 +95,9 @@
           "untrimmed explanation",
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
-        ["exactly 1000 chars", "A".repeat(1000), []],
+        ["exactly 1000 chars", "".repeat(1000), []],
         [
           "1001 chars",
           "A".repeat(1001),
           [{ explanation: `${"A".repeat(997)}...` }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
