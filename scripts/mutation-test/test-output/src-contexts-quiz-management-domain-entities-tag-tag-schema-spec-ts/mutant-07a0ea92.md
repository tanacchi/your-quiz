# Mutant 07a0ea92 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6966
**Stable ID**: 07a0ea92
**Location**: L113:10–L113:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6966
@@ -109,9 +109,9 @@
         ["valid name", "TypeScript", true],
         ["single character", "T", true],
         ["unicode characters", "プログラミング", true],
         ["with spaces", "Programming Language", true],
-        ["with special chars", "C++", true],
+        ["", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["51 chars", "A".repeat(51), false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
