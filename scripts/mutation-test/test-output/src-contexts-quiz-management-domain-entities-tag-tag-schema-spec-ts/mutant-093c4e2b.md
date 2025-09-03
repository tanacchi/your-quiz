# Mutant 093c4e2b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6844
**Stable ID**: 093c4e2b
**Location**: L36:10–L36:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6844
@@ -32,9 +32,9 @@
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
