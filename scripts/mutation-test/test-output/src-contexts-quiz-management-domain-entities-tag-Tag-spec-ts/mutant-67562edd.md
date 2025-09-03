# Mutant 67562edd Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6251
**Stable ID**: 67562edd
**Location**: L192:12–L192:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6251
@@ -188,9 +188,9 @@
       }
     });
   });
 
-  describe("Business Logic", () => {
+  describe("", () => {
     let tag: Tag;
 
     beforeEach(() => {
       const tagWithRelations = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
