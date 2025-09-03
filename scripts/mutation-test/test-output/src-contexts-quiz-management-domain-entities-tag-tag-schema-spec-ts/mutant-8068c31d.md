# Mutant 8068c31d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7302
**Stable ID**: 8068c31d
**Location**: L507:10–L507:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7302
@@ -503,9 +503,9 @@
         ["unicode", "プログラミング言語"],
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
-        ["underscores", "Snake_Case"],
+        ["", "Snake_Case"],
         ["dots", "Node.js"],
       ])("should accept name with %s", (_desc, name) => {
         const data = { ...validTagData, name };
         const result = TagSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
