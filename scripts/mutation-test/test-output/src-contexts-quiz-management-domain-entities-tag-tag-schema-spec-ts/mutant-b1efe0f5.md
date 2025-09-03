# Mutant b1efe0f5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6828
**Stable ID**: b1efe0f5
**Location**: L32:10–L32:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6828
@@ -28,9 +28,9 @@
     describe("TagId", () => {
       it.each([
         ["valid alphanumeric", "tag-123", true],
         ["valid with underscore", "tag_test", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
