# Mutant adb357ac Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6317
**Stable ID**: adb357ac
**Location**: L282:12–L282:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6317
@@ -278,9 +278,9 @@
       expect(entity).toBeDefined();
     });
   });
 
-  describe("Immutability", () => {
+  describe("", () => {
     it("should return new instance on updates", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
       const originalTag = result._unsafeUnwrap();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
