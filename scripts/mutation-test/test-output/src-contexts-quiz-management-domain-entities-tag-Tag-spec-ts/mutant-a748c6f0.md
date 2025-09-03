# Mutant a748c6f0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6153
**Stable ID**: a748c6f0
**Location**: L47:10–L47:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6153
@@ -43,9 +43,9 @@
         ["category", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid", false],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
