# Mutant 321ad016 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6978
**Stable ID**: 321ad016
**Location**: L116:10–L116:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6978
@@ -112,9 +112,9 @@
         ["with spaces", "Programming Language", true],
         ["with special chars", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
         ["empty string", "", false],
-        ["only whitespace", "   ", true],
+        ["", "   ", true],
         ["51 chars", "A".repeat(51), false],
         ["null value", null, false],
       ])("should validate name: %s -> %s", (_desc, name, isValid) => {
         const data = { ...validTagData, name };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
