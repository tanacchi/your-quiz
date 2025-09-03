# Mutant c641c1e6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6988
**Stable ID**: c641c1e6
**Location**: L119:10–L119:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6988
@@ -115,9 +115,9 @@
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["51 chars", "A".repeat(51), false],
         ["null value", null, false],
-      ])("should validate name: %s -> %s", (_desc, name, isValid) => {
+      ])("", (_desc, name, isValid) => {
         const data = { ...validTagData, name };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
