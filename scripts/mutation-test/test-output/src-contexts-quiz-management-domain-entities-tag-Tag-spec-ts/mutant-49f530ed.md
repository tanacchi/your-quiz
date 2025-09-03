# Mutant 49f530ed Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6141
**Stable ID**: 49f530ed
**Location**: L44:10–L44:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6141
@@ -40,9 +40,9 @@
     describe("RelationType validation", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
         ["category", "category", true],
-        ["synonym", "synonym", true],
+        ["", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid", false],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
