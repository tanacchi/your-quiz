# Mutant 24e40a9c Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6154
**Stable ID**: 24e40a9c
**Location**: L47:26–L47:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6154
@@ -43,9 +43,9 @@
         ["category", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null value", null, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
