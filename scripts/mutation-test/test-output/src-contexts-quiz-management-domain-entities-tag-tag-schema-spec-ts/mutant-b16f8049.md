# Mutant b16f8049 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7296
**Stable ID**: b16f8049
**Location**: L505:10–L505:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7296
@@ -501,9 +501,9 @@
         ["special characters", "C++"],
         ["emoji", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
         ["spaces", "Programming Language"],
-        ["numbers", "TypeScript 4.9"],
+        ["", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
         ["underscores", "Snake_Case"],
         ["dots", "Node.js"],
       ])("should accept name with %s", (_desc, name) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
