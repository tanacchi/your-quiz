# Mutant eb331b7c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6962
**Stable ID**: eb331b7c
**Location**: L112:10–L112:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6962
@@ -108,9 +108,9 @@
       it.each([
         ["valid name", "TypeScript", true],
         ["single character", "T", true],
         ["unicode characters", "プログラミング", true],
-        ["with spaces", "Programming Language", true],
+        ["", "Programming Language", true],
         ["with special chars", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
