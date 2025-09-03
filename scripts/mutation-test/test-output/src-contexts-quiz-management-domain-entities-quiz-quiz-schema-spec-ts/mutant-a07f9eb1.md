# Mutant a07f9eb1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3008
**Stable ID**: a07f9eb1
**Location**: L204:32–L204:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3008
@@ -200,9 +200,9 @@
         }
       });
 
       it.each([
-        ["exactly 1000 chars", "A".repeat(1000), true],
+        ["exactly 1000 chars", "".repeat(1000), true],
         ["1001 chars", "A".repeat(1001), false],
         ["empty string", "", true],
         ["only whitespace", "   ", true],
       ])(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
