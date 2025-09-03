# Mutant 617ec7e2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6118
**Stable ID**: 617ec7e2
**Location**: L31:10–L31:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6118
@@ -27,9 +27,9 @@
     describe("UserId validation", () => {
       it.each([
         ["valid alphanumeric", "user-1", true],
         ["valid with numbers", "user123", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = UserId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
