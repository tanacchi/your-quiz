# Mutant 6b6897c8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6900
**Stable ID**: 6b6897c8
**Location**: L68:10–L68:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6900
@@ -64,9 +64,9 @@
     describe("RelationType", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
         ["category", "category", true],
-        ["synonym", "synonym", true],
+        ["", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
