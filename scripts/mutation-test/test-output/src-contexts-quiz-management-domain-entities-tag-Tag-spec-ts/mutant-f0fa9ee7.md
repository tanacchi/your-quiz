# Mutant f0fa9ee7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6145
**Stable ID**: f0fa9ee7
**Location**: L45:10–L45:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6145
@@ -41,9 +41,9 @@
       it.each([
         ["hierarchy", "hierarchy", true],
         ["category", "category", true],
         ["synonym", "synonym", true],
-        ["related", "related", true],
+        ["", "related", true],
         ["invalid type", "invalid", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
