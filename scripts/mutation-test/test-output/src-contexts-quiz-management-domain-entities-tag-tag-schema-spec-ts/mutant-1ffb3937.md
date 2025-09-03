# Mutant 1ffb3937 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6888
**Stable ID**: 1ffb3937
**Location**: L64:14–L64:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6888
@@ -60,9 +60,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelationType", () => {
+    describe("", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
         ["category", "category", true],
         ["synonym", "synonym", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
