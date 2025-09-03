# Mutant 2bdbaa55 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6896
**Stable ID**: 2bdbaa55
**Location**: L67:10–L67:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6896
@@ -63,9 +63,9 @@
 
     describe("RelationType", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
+        ["", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
