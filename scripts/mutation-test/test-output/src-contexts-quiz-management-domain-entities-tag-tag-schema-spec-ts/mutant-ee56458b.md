# Mutant ee56458b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7263
**Stable ID**: ee56458b
**Location**: L479:14–L479:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7263
@@ -475,9 +475,9 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("Name Length Boundaries", () => {
+    describe("", () => {
       it("should accept exactly 1 character name", () => {
         const data = { ...validTagData, name: "A" };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
