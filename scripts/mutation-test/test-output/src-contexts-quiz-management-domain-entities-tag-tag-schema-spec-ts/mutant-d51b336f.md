# Mutant d51b336f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6850
**Stable ID**: d51b336f
**Location**: L38:10–L38:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6850
@@ -34,9 +34,9 @@
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
-        ["number", 123, false],
+        ["", 123, false],
         ["object", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
