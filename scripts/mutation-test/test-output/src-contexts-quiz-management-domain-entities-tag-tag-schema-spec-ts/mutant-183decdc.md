# Mutant 183decdc Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6958
**Stable ID**: 183decdc
**Location**: L111:10–L111:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6958
@@ -107,9 +107,9 @@
     describe("Name Field", () => {
       it.each([
         ["valid name", "TypeScript", true],
         ["single character", "T", true],
-        ["unicode characters", "プログラミング", true],
+        ["", "プログラミング", true],
         ["with spaces", "Programming Language", true],
         ["with special chars", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
