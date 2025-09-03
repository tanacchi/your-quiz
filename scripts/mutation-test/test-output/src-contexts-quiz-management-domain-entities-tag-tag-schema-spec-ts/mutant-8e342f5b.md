# Mutant 8e342f5b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6909
**Stable ID**: 8e342f5b
**Location**: L70:26–L70:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6909
@@ -66,9 +66,9 @@
         ["hierarchy", "hierarchy", true],
         ["category", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
-        ["invalid type", "invalid_type", false],
+        ["invalid type", "", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
