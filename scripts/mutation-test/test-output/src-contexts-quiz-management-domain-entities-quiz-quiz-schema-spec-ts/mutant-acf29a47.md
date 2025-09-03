# Mutant acf29a47 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3011
**Stable ID**: acf29a47
**Location**: L205:10–L205:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3011
@@ -201,9 +201,9 @@
       });
 
       it.each([
         ["exactly 1000 chars", "A".repeat(1000), true],
-        ["1001 chars", "A".repeat(1001), false],
+        ["", "A".repeat(1001), false],
         ["empty string", "", true],
         ["only whitespace", "   ", true],
       ])(
         "should validate explanation length: %s -> %s",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
