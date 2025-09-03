# Mutant 2ea6676a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6974
**Stable ID**: 2ea6676a
**Location**: L115:10–L115:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6974
@@ -111,9 +111,9 @@
         ["unicode characters", "プログラミング", true],
         ["with spaces", "Programming Language", true],
         ["with special chars", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
-        ["empty string", "", false],
+        ["", "", false],
         ["only whitespace", "   ", true],
         ["51 chars", "A".repeat(51), false],
         ["null value", null, false],
       ])("should validate name: %s -> %s", (_desc, name, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
