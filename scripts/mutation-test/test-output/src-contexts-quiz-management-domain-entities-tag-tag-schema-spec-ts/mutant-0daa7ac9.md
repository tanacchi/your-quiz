# Mutant 0daa7ac9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7261
**Stable ID**: 0daa7ac9
**Location**: L478:12–L478:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7261
@@ -474,9 +474,9 @@
       });
     });
   });
 
-  describe("Edge Cases and Boundary Values", () => {
+  describe("", () => {
     describe("Name Length Boundaries", () => {
       it("should accept exactly 1 character name", () => {
         const data = { ...validTagData, name: "A" };
         const result = TagSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
