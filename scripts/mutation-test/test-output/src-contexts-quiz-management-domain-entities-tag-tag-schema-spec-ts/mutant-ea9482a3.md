# Mutant ea9482a3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7287
**Stable ID**: ea9482a3
**Location**: L502:10–L502:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7287
@@ -498,9 +498,9 @@
 
     describe("Special Characters in Names", () => {
       it.each([
         ["special characters", "C++"],
-        ["emoji", "TypeScript 🚀"],
+        ["", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
         ["hyphens", "Front-End"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
