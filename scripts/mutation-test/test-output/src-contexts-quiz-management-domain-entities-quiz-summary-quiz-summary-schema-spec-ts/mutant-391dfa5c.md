# Mutant 391dfa5c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5044
**Stable ID**: 391dfa5c
**Location**: L91:10–L91:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5044
@@ -87,9 +87,9 @@
     });
 
     describe("TagIds", () => {
       it.each([
-        ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
+        ["", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
         ["empty array", [], []],
         ["null value", null, []],
         ["undefined value", undefined, []],
         ["single tag", ["tag-1"], ["tag-1"]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
