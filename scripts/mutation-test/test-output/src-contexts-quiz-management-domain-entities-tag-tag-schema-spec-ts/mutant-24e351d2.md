# Mutant 24e351d2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6892
**Stable ID**: 24e351d2
**Location**: L66:10–L66:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6892
@@ -62,9 +62,9 @@
     });
 
     describe("RelationType", () => {
       it.each([
-        ["hierarchy", "hierarchy", true],
+        ["", "hierarchy", true],
         ["category", "category", true],
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid_type", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
