# Mutant 1baea5ec Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6946
**Stable ID**: 1baea5ec
**Location**: L107:14–L107:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6946
@@ -103,9 +103,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Name Field", () => {
+    describe("", () => {
       it.each([
         ["valid name", "TypeScript", true],
         ["single character", "T", true],
         ["unicode characters", "プログラミング", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
