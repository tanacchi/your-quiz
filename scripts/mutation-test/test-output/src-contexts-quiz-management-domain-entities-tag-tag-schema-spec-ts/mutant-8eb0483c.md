# Mutant 8eb0483c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7284
**Stable ID**: 8eb0483c
**Location**: L501:10–L501:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7284
@@ -497,9 +497,9 @@
     });
 
     describe("Special Characters in Names", () => {
       it.each([
-        ["special characters", "C++"],
+        ["", "C++"],
         ["emoji", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
         ["spaces", "Programming Language"],
         ["numbers", "TypeScript 4.9"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
