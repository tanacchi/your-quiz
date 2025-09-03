# Mutant 18a2ffca Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3015
**Stable ID**: 18a2ffca
**Location**: L206:10–L206:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3015
@@ -202,9 +202,9 @@
 
       it.each([
         ["exactly 1000 chars", "A".repeat(1000), true],
         ["1001 chars", "A".repeat(1001), false],
-        ["empty string", "", true],
+        ["", "", true],
         ["only whitespace", "   ", true],
       ])(
         "should validate explanation length: %s -> %s",
         (_desc, explanation, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
