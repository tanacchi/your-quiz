# Mutant b4e4b280 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6099
**Stable ID**: b4e4b280
**Location**: L19:10–L19:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6099
@@ -15,9 +15,9 @@
       it.each([
         ["valid alphanumeric", "tag-1", true],
         ["valid with numbers", "tag123", true],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
