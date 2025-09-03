# Mutant 0654faba Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3016
**Stable ID**: 0654faba
**Location**: L206:26–L206:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3016
@@ -202,9 +202,9 @@
 
       it.each([
         ["exactly 1000 chars", "A".repeat(1000), true],
         ["1001 chars", "A".repeat(1001), false],
-        ["empty string", "", true],
+        ["empty string", "Stryker was here!", true],
         ["only whitespace", "   ", true],
       ])(
         "should validate explanation length: %s -> %s",
         (_desc, explanation, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
