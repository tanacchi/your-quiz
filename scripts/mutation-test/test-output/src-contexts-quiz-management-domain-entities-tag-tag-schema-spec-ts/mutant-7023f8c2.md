# Mutant 7023f8c2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6855
**Stable ID**: 7023f8c2
**Location**: L40:10–L40:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6855
@@ -36,9 +36,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
