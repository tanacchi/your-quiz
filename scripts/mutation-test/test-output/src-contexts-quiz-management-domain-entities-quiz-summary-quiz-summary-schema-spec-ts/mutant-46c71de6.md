# Mutant 46c71de6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5067
**Stable ID**: 46c71de6
**Location**: L96:10–L96:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5067
@@ -92,9 +92,9 @@
         ["empty array", [], []],
         ["null value", null, []],
         ["undefined value", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
-      ])("should transform %s: %s -> %s", (_desc, input, expected) => {
+      ])("", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
         if (result.success) {
           expect(result.data).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
