# Mutant 879cde12 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7290
**Stable ID**: 879cde12
**Location**: L503:10–L503:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7290
@@ -499,9 +499,9 @@
     describe("Special Characters in Names", () => {
       it.each([
         ["special characters", "C++"],
         ["emoji", "TypeScript 🚀"],
-        ["unicode", "プログラミング言語"],
+        ["", "プログラミング言語"],
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
         ["underscores", "Snake_Case"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
