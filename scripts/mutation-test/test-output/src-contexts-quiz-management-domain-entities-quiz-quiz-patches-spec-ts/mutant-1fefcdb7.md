# Mutant 1fefcdb7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1741
**Stable ID**: 1fefcdb7
**Location**: L101:11–L101:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1741
@@ -97,9 +97,9 @@
           [{ explanation: "Valid explanation" }],
         ],
         ["exactly 1000 chars", "A".repeat(1000), []],
         [
-          "1001 chars",
+          "",
           "A".repeat(1001),
           [{ explanation: `${"A".repeat(997)}...` }],
         ],
         ["valid explanation", "Valid explanation", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
