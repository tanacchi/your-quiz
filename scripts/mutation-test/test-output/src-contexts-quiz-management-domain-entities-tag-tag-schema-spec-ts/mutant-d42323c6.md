# Mutant d42323c6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6986
**Stable ID**: d42323c6
**Location**: L118:10–L118:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6986
@@ -114,9 +114,9 @@
         ["exactly 50 chars", "A".repeat(50), true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["51 chars", "A".repeat(51), false],
-        ["null value", null, false],
+        ["", null, false],
       ])("should validate name: %s -> %s", (_desc, name, isValid) => {
         const data = { ...validTagData, name };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
