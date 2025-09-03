# Mutant e49897bd Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7185
**Stable ID**: e49897bd
**Location**: L352:14–L352:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7185
@@ -348,9 +348,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Self-Reference Prevention", () => {
+    describe("", () => {
       it("should accept tag with no self-reference", () => {
         const dataWithoutSelfReference = {
           ...validTagData,
           id: "tag-main",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
