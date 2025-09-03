# Mutant f063fbf8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7127
**Stable ID**: f063fbf8
**Location**: L256:14–L256:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7127
@@ -252,9 +252,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Strict Mode", () => {
+    describe("", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validTagData,
           extraField: "not allowed",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
