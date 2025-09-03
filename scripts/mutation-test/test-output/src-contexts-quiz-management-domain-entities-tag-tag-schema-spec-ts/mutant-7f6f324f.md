# Mutant 7f6f324f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7293
**Stable ID**: 7f6f324f
**Location**: L504:10–L504:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7293
@@ -500,9 +500,9 @@
       it.each([
         ["special characters", "C++"],
         ["emoji", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
-        ["spaces", "Programming Language"],
+        ["", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
         ["underscores", "Snake_Case"],
         ["dots", "Node.js"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
