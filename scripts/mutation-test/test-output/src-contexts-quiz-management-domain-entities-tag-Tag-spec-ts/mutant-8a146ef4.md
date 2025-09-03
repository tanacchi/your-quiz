# Mutant 8a146ef4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6095
**Stable ID**: 8a146ef4
**Location**: L18:10–L18:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6095
@@ -14,9 +14,9 @@
     describe("TagId validation", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
