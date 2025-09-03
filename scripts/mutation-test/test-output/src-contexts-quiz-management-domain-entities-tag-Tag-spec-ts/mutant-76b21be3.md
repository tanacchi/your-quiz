# Mutant 76b21be3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6087
**Stable ID**: 76b21be3
**Location**: L16:10–L16:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6087
@@ -12,9 +12,9 @@
 
   describe("Brand Types", () => {
     describe("TagId validation", () => {
       it.each([
-        ["valid alphanumeric", "tag-1", true],
+        ["", "tag-1", true],
         ["valid with numbers", "tag123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
