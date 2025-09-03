# Mutant 69a57e22 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6091
**Stable ID**: 69a57e22
**Location**: L17:10–L17:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6091
@@ -13,9 +13,9 @@
   describe("Brand Types", () => {
     describe("TagId validation", () => {
       it.each([
         ["valid alphanumeric", "tag-1", true],
-        ["valid with numbers", "tag123", true],
+        ["", "tag123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
