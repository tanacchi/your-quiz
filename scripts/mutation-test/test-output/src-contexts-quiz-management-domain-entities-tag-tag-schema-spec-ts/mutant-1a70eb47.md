# Mutant 1a70eb47 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7280
**Stable ID**: 1a70eb47
**Location**: L499:14–L499:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7280
@@ -495,9 +495,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Special Characters in Names", () => {
+    describe("", () => {
       it.each([
         ["special characters", "C++"],
         ["emoji", "TypeScript 🚀"],
         ["unicode", "プログラミング言語"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
