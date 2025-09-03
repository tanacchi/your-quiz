# Mutant 901dbfd5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6125
**Stable ID**: 901dbfd5
**Location**: L33:10–L33:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6125
@@ -29,9 +29,9 @@
         ["valid alphanumeric", "user-1", true],
         ["valid with numbers", "user123", true],
         ["empty string", "", false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = UserId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
