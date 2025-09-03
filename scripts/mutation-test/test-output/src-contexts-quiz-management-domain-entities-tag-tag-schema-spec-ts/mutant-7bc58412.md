# Mutant 7bc58412 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7234
**Stable ID**: 7bc58412
**Location**: L433:14–L433:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7234
@@ -429,9 +429,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Combined Validation Errors", () => {
+    describe("", () => {
       it("should report both duplicate IDs and self-reference errors", () => {
         const dataWithBothErrors = {
           ...validTagData,
           id: "tag-problem",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
