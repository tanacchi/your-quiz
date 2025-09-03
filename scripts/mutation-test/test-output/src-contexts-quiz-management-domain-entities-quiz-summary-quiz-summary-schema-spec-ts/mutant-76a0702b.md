# Mutant 76a0702b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5042
**Stable ID**: 76a0702b
**Location**: L90:15–L96:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5042
@@ -86,15 +86,9 @@
       });
     });
 
     describe("TagIds", () => {
-      it.each([
-        ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
-        ["empty array", [], []],
-        ["null value", null, []],
-        ["undefined value", undefined, []],
-        ["single tag", ["tag-1"], ["tag-1"]],
-      ])("should transform %s: %s -> %s", (_desc, input, expected) => {
+      it.each([])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
         if (result.success) {
           expect(result.data).toEqual(expected);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
