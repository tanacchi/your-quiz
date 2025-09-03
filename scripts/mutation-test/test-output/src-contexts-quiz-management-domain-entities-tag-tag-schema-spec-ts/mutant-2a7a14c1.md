# Mutant 2a7a14c1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6853
**Stable ID**: 2a7a14c1
**Location**: L39:10–L39:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6853
@@ -35,9 +35,9 @@
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
-        ["object", {}, false],
+        ["", {}, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
