# Mutant a068ff49 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6824
**Stable ID**: a068ff49
**Location**: L31:10–L31:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6824
@@ -27,9 +27,9 @@
   describe("Brand Types", () => {
     describe("TagId", () => {
       it.each([
         ["valid alphanumeric", "tag-123", true],
-        ["valid with underscore", "tag_test", true],
+        ["", "tag_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
