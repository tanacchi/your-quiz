# Mutant 156512cb Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6840
**Stable ID**: 156512cb
**Location**: L35:10–L35:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6840
@@ -31,9 +31,9 @@
         ["valid with underscore", "tag_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
-        ["only whitespace", "   ", true],
+        ["", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
