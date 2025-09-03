# Mutant 895acbf7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6319
**Stable ID**: 895acbf7
**Location**: L283:8–L283:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6319
@@ -279,9 +279,9 @@
     });
   });
 
   describe("Immutability", () => {
-    it("should return new instance on updates", () => {
+    it("", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
       const originalTag = result._unsafeUnwrap();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
