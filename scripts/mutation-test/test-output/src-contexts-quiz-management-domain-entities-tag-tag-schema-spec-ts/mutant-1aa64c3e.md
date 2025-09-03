# Mutant 1aa64c3e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7299
**Stable ID**: 1aa64c3e
**Location**: L506:10–L506:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7299
@@ -502,9 +502,9 @@
         ["emoji", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
-        ["hyphens", "Front-End"],
+        ["", "Front-End"],
         ["underscores", "Snake_Case"],
         ["dots", "Node.js"],
       ])("should accept name with %s", (_desc, name) => {
         const data = { ...validTagData, name };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
