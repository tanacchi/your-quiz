# Mutant 2b38f933 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6950
**Stable ID**: 2b38f933
**Location**: L109:10–L109:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6950
@@ -105,9 +105,9 @@
     });
 
     describe("Name Field", () => {
       it.each([
-        ["valid name", "TypeScript", true],
+        ["", "TypeScript", true],
         ["single character", "T", true],
         ["unicode characters", "プログラミング", true],
         ["with spaces", "Programming Language", true],
         ["with special chars", "C++", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
