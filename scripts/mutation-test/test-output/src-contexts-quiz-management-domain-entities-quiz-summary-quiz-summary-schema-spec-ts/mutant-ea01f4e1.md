# Mutant ea01f4e1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5071
**Stable ID**: ea01f4e1
**Location**: L99:13–L99:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5071
@@ -95,9 +95,9 @@
         ["single tag", ["tag-1"], ["tag-1"]],
       ])("should transform %s: %s -> %s", (_desc, input, expected) => {
         const result = TagIds.safeParse(input);
         expect(result.success).toBe(true);
-        if (result.success) {
+        if (false) {
           expect(result.data).toEqual(expected);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
