# Mutant 4e90989d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6954
**Stable ID**: 4e90989d
**Location**: L110:10–L110:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6954
@@ -106,9 +106,9 @@
 
     describe("Name Field", () => {
       it.each([
         ["valid name", "TypeScript", true],
-        ["single character", "T", true],
+        ["", "T", true],
         ["unicode characters", "プログラミング", true],
         ["with spaces", "Programming Language", true],
         ["with special chars", "C++", true],
         ["exactly 50 chars", "A".repeat(50), true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
