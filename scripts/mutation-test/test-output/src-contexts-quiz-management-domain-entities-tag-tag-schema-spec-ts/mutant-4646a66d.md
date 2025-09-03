# Mutant 4646a66d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6847
**Stable ID**: 4646a66d
**Location**: L37:10–L37:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6847
@@ -33,9 +33,9 @@
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
