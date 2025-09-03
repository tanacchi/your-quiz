# Mutant 3f6d43a8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6161
**Stable ID**: 3f6d43a8
**Location**: L56:12–L56:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6161
@@ -52,9 +52,9 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
+  describe("", () => {
     it("should create valid tag from complete data", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
