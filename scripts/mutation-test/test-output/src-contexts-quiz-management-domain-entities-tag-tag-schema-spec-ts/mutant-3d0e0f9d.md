# Mutant 3d0e0f9d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7265
**Stable ID**: 3d0e0f9d
**Location**: L480:10–L480:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7265
@@ -476,9 +476,9 @@
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Name Length Boundaries", () => {
-      it("should accept exactly 1 character name", () => {
+      it("", () => {
         const data = { ...validTagData, name: "A" };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
