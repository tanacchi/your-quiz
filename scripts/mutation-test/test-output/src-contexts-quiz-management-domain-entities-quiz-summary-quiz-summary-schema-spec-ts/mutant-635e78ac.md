# Mutant 635e78ac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5056
**Stable ID**: 635e78ac
**Location**: L93:10–L93:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5056
@@ -89,9 +89,9 @@
     describe("TagIds", () => {
       it.each([
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
         ["empty array", [], []],
-        ["null value", null, []],
+        ["", null, []],
         ["undefined value", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
