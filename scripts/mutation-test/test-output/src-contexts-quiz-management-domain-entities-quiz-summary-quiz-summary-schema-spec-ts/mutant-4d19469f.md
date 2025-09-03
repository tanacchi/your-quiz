# Mutant 4d19469f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5059
**Stable ID**: 4d19469f
**Location**: L94:10–L94:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5059
@@ -90,9 +90,9 @@
       it.each([
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
         ["empty array", [], []],
         ["null value", null, []],
-        ["undefined value", undefined, []],
+        ["", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
