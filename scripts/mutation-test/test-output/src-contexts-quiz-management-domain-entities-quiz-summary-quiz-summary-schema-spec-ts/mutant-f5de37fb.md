# Mutant f5de37fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5062
**Stable ID**: f5de37fb
**Location**: L95:10–L95:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5062
@@ -91,9 +91,9 @@
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
         ["empty array", [], []],
         ["null value", null, []],
         ["undefined value", undefined, []],
-        ["single tag", ["tag-1"], ["tag-1"]],
+        ["", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
         if (result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
