# Mutant 229d143d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6129
**Stable ID**: 229d143d
**Location**: L40:14–L40:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6129
@@ -36,9 +36,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("RelationType validation", () => {
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
