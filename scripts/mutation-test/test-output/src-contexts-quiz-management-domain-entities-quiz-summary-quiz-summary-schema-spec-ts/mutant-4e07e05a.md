# Mutant 4e07e05a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5052
**Stable ID**: 4e07e05a
**Location**: L92:10–L92:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5052
@@ -88,9 +88,9 @@
 
     describe("TagIds", () => {
       it.each([
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
-        ["empty array", [], []],
+        ["", [], []],
         ["null value", null, []],
         ["undefined value", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
